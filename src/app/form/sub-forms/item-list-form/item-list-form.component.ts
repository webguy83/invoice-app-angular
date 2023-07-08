import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  NonNullableFormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';
import { ItemListForm } from 'src/app/utils/interfaces';

interface Item {
  itemName: FormControl<string>;
  qty: FormControl<number>;
  price: FormControl<number>;
}

@Component({
  selector: 'app-item-list-form',
  templateUrl: './item-list-form.component.html',
  styleUrls: ['./item-list-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ItemListFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ItemListFormComponent),
      multi: true,
    },
  ],
})
export class ItemListFormComponent
  implements ControlValueAccessor, OnDestroy, Validator, OnInit
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();
  bp$!: Observable<string>;
  @Input() reset: Observable<boolean> | undefined;
  resetSub = new Subscription();

  constructor(
    private fb: NonNullableFormBuilder,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;

    if (this.reset) {
      this.resetSub = this.reset.subscribe((reset) => {
        if (reset) {
          this.capValues.reset([this.makeItem()]);
          this.itemListForm.reset();
        }
      });
    }
  }

  itemListForm = this.fb.group({
    cap_values: this.fb.array([this.makeItem()]),
  });

  makeItem(): FormGroup<Item> {
    return this.fb.group({
      itemName: ['', Validators.required],
      qty: [1, Validators.required],
      price: [0, Validators.required],
    });
  }

  calculate(control: AbstractControl) {
    return control.get('qty')?.value * control.get('price')?.value;
  }

  addNewItemClick() {
    const itemForm = this.makeItem();
    this.capValues.push(itemForm);
  }

  removeItem(i: number) {
    this.capValues.removeAt(i);
  }

  get capValues() {
    return <FormArray>this.itemListForm.get('cap_values');
  }

  writeValue(val: ItemListForm): void {
    if (val) {
      const { cap_values } = val;
      const items: FormGroup<Item>[] = cap_values.map((value) => {
        return this.fb.group({
          itemName: [value.itemName, Validators.required],
          qty: [value.qty, Validators.required],
          price: [value.price, Validators.required],
        });
      });
      this.itemListForm = this.fb.group({
        cap_values: this.fb.array([...items]),
      });
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeSub = this.itemListForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
    this.resetSub.unsubscribe();
  }
  validate(): ValidationErrors | null {
    if (this.capValues.length < 1) {
      return {
        message: 'An item must be added',
      };
    }
    if (this.itemListForm.valid) {
      return null;
    } else {
      return {
        message: 'All fields must be added',
      };
    }
  }
}

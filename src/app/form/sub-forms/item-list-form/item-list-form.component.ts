import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';

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
    CurrencyPipe,
  ],
})
export class ItemListFormComponent
  implements ControlValueAccessor, OnDestroy, Validator, OnInit
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();
  bp$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointsService,
    private currencyPipe: CurrencyPipe
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
  }

  itemListForm = this.fb.group({
    cap_values: this.fb.array([this.makeItem()]),
  });

  makeItem() {
    return this.fb.group({
      itemName: ['', Validators.required],
      qty: [1, Validators.required],
      price: [0, Validators.required],
      total: [{ value: 0, disabled: true }],
    });
  }

  calculate(control: AbstractControl) {
    const currencyPipe = this.currencyPipe.transform(
      control.get('qty')?.value * control.get('price')?.value,
      'GBP'
    );
    control.get('total')?.setValue(currencyPipe);
  }

  addNewItemClick() {
    const itemForm = this.makeItem();
    this.capValues.push(itemForm);
  }

  removeItem(i: number) {
    this.capValues.removeAt(i);
  }

  get capValues() {
    return this.itemListForm.get('cap_values') as FormArray;
  }

  writeValue(val: any): void {
    if (val) {
      this.itemListForm.setValue(val, { emitEvent: false });
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
  }
  validate(): ValidationErrors | null {
    if (this.capValues.length < 1) {
      return {
        message: 'An item must be added',
      };
    }
    return this.itemListForm.valid
      ? null
      : {
          message: 'All fields must be added',
        };
  }
}

import { Component, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

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
  implements ControlValueAccessor, OnDestroy, Validator
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  itemListForm = this.fb.group({});

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
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.itemListForm.disable() : this.itemListForm.enable();
  }
  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }
  validate(): ValidationErrors | null {
    return this.itemListForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Fields are invalid',
          },
        };
  }
}

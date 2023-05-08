import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-bill-from-form',
  templateUrl: './bill-from-form.component.html',
  styleUrls: ['./bill-from-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BillFromFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BillFromFormComponent),
      multi: true,
    },
  ],
})
export class BillFromFormComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();

  billFromForm = this.fb.group({
    senderStreetAddress: ['', [Validators.required]],
    senderCity: ['', [Validators.required]],
    senderPostCode: ['', [Validators.required]],
    senderCountry: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  writeValue(val: any): void {
    if (val) {
      this.billFromForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.billFromForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.billFromForm.disable() : this.billFromForm.enable();
  }

  validate(): ValidationErrors | null {
    return this.billFromForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Fields are invalid',
          },
        };
  }
}

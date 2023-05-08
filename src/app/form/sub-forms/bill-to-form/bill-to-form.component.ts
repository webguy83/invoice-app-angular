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
  selector: 'app-bill-to-form',
  templateUrl: './bill-to-form.component.html',
  styleUrls: ['./bill-to-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BillToFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BillToFormComponent),
      multi: true,
    },
  ],
})
export class BillToFormComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();

  billToForm = this.fb.group({
    clientName: ['', [Validators.required]],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientStreetAddress: ['', [Validators.required]],
    clientCity: ['', [Validators.required]],
    clientPostCode: ['', [Validators.required]],
    clientCountry: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  writeValue(val: any): void {
    if (val) {
      this.billToForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.billToForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.billToForm.disable() : this.billToForm.enable();
  }

  validate(): ValidationErrors | null {
    return this.billToForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Fields are invalid',
          },
        };
  }
}

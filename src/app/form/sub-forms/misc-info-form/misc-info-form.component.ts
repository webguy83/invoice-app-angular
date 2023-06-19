import { Component, forwardRef, OnDestroy } from '@angular/core';
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
  selector: 'app-misc-info-form',
  templateUrl: './misc-info-form.component.html',
  styleUrls: ['./misc-info-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MiscInfoFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MiscInfoFormComponent),
      multi: true,
    },
  ],
})
export class MiscInfoFormComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  validate(): ValidationErrors | null {
    return this.miscInfoForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Fields are invalid',
          },
        };
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  miscInfoForm = this.fb.group({
    invoiceDate: [new Date(), [Validators.required]],
    paymentTerms: ['', [Validators.required]],
    projectDescription: ['', [Validators.required]],
  });

  writeValue(val: any): void {
    if (val) {
      this.miscInfoForm.setValue(val, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeSub = this.miscInfoForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.miscInfoForm.disable() : this.miscInfoForm.enable();
  }
}

import { Component, OnDestroy, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
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
  implements ControlValueAccessor, OnDestroy, Validator, OnInit
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();
  bp$!: Observable<string>;

  billToForm = this.fb.group({
    clientName: ['', [Validators.required]],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientStreetAddress: ['', [Validators.required]],
    clientCity: ['', [Validators.required]],
    clientPostCode: ['', [Validators.required]],
    clientCountry: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
  }

  errMsg = '';

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
    if (this.billToForm.get('clientEmail')?.hasError('required')) {
      this.errMsg = "can't be empty";
    } else if (this.billToForm.get('clientEmail')?.hasError('email')) {
      this.errMsg = 'invalid email';
    }
    return this.billToForm.valid
      ? null
      : {
          message: 'All fields must be added',
        };
  }
}

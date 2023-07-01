import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
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
  implements ControlValueAccessor, OnDestroy, Validator, OnInit
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();
  bp$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
  }

  validate(): ValidationErrors | null {
    return this.miscInfoForm.valid
      ? null
      : {
          message: 'All fields must be added',
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

import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, forwardRef, OnInit, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NonNullableFormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { BreakpointsService } from 'src/app/services/breakpoint.service';

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
  implements ControlValueAccessor, OnDestroy, Validator, OnInit
{
  onTouched = () => {};
  onChangeSub: Subscription = new Subscription();
  bp$!: Observable<string>;
  @Input() reset: Observable<boolean> | undefined;
  resetSub = new Subscription();

  billFromForm = this.fb.group({
    senderStreetAddress: ['', [Validators.required]],
    senderCity: ['', [Validators.required]],
    senderPostCode: ['', [Validators.required]],
    senderCountry: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;

    if (this.reset) {
      this.resetSub = this.reset.subscribe((reset) => {
        if (reset) {
          this.billFromForm.reset();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
    this.resetSub.unsubscribe();
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
          message: 'All fields must be added',
        };
  }
}

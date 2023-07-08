import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AfterViewInit, Component, forwardRef, OnInit } from '@angular/core';

interface Term {
  label: string;
  value: number;
}

@Component({
  selector: 'app-select-payment-terms',
  templateUrl: './select-payment-terms.component.html',
  styleUrls: ['./select-payment-terms.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectPaymentTermsComponent),
      multi: true,
    },
  ],
})
export class SelectPaymentTermsComponent
  implements ControlValueAccessor, AfterViewInit
{
  selectRegionIsOpen: boolean = false;

  onTouched = () => {};
  onChange = (val: number) => {};

  terms: Term[] = [
    { label: 'Net 1 Day', value: 1 },
    { label: 'Net 7 Days', value: 7 },
    { label: 'Net 14 Days', value: 14 },
    { label: 'Net 30 Days', value: 30 },
  ];
  regions = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'];

  selectedRegion = this.terms[this.terms.length - 1].label;
  constructor() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onChange(this.terms[this.terms.length - 1].value);
    });
  }

  writeValue(val: number): void {
    if (val) {
      const term = this.terms.find((t) => t.value === val);
      if (term) {
        this.selectedRegion = term.label;
      }
      this.onChange(val);
    }
  }
  registerOnChange(fn: (val: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onRegionClick() {
    this.selectRegionIsOpen = !this.selectRegionIsOpen;
  }

  onRegionBlur() {
    this.selectRegionIsOpen = false;
  }

  onRegionChange(evt: Event) {
    const region = +(evt.target as HTMLInputElement).value;
    this.writeValue(region);
    const foundTerm = this.terms.find((term) => term.value === region);
    if (foundTerm) {
      this.selectedRegion = foundTerm.label;
    }
    this.onTouched();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

interface Term {
  label: string;
  value: number;
}

@Component({
  selector: 'app-select-payment-terms',
  templateUrl: './select-payment-terms.component.html',
  styleUrls: ['./select-payment-terms.component.scss'],
})
export class SelectPaymentTermsComponent {
  selectRegionIsOpen: boolean = false;

  terms: Term[] = [
    { label: 'Net 1 Day', value: 1 },
    { label: 'Net 7 Days', value: 7 },
    { label: 'Net 14 Days', value: 14 },
    { label: 'Net 30 Days', value: 30 },
  ];
  regions = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'];
  @Output() selectedRegionChange = new EventEmitter<string>();

  selectedRegion = this.terms[this.terms.length - 1].label;
  constructor() {}
  ngOnInit() {
    this.selectedRegionChange.subscribe((region) => {
      this.selectedRegion = region;
    });
  }

  onRegionClick() {
    this.selectRegionIsOpen = !this.selectRegionIsOpen;
  }

  onRegionBlur() {
    this.selectRegionIsOpen = false;
  }

  onRegionChange(evt: Event) {
    const region = (evt.target as HTMLInputElement).value;
    this.selectedRegionChange.emit(region);
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select-payment-terms',
  templateUrl: './select-payment-terms.component.html',
  styleUrls: ['./select-payment-terms.component.scss'],
})
export class SelectPaymentTermsComponent {
  selectRegionIsOpen: boolean = false;

  regions: string[] = ['test', 'oger'];
  @Output() selectedRegionChange = new EventEmitter<string>();

  selectedRegion = 'Filter By Region';
  constructor(private eRef: ElementRef) {}
  ngOnInit() {
    this.selectedRegionChange.subscribe((region) => {
      this.selectedRegion = region;
    });
    // this.utilitiesService.documentClickedTarget.subscribe((target) =>
    //   this.documentClickListener(target)
    // );
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
    this.selectRegionIsOpen = false;
  }

  documentClickListener(target: HTMLElement): void {
    if (!this.eRef.nativeElement.contains(target)) {
      this.selectRegionIsOpen = false;
    }
  }
}

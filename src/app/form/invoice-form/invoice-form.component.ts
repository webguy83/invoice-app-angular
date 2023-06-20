import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  bp$!: Observable<string>;

  form = this.fb.group({
    billFromForm: [],
    billToForm: [],
    miscInfoForm: [],
    itemListForm: [],
  });

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

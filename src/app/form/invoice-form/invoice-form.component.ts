import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  bp$!: Observable<string>;
  sub = new Subscription();
  errors: string[] = [];

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;

    this.sub = this.form.valueChanges.subscribe(() => {
      const errors: string[] = [
        this.form.controls.billFromForm.errors,
        this.form.controls.billToForm.errors,
        this.form.controls.miscInfoForm.errors,
        this.form.controls.itemListForm.errors,
      ]
        .filter((error) => {
          return error;
        })
        .map((error) => {
          if (error) {
            return error['message'];
          }
        });
      this.errors = [...new Set(errors)];
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

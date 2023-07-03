import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';
import { InvoicesStore } from 'src/app/services/invoices.store';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  bp$!: Observable<string>;
  sub = new Subscription();
  errors: string[] = [];
  resetSubject: Subject<boolean> = new Subject();
  reset$: Observable<boolean> = this.resetSubject.asObservable();

  form = this.fb.group({
    billFromForm: [],
    billToForm: [],
    miscInfoForm: [],
    itemListForm: [],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private breakpointService: BreakpointsService,
    private invoicesStore: InvoicesStore
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

  onDiscardClick() {
    this.form.reset();
    this.resetSubject.next(true);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

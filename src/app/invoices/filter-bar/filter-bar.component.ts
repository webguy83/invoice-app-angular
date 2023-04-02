import { Status, StatusParams } from './../../utils/interfaces';
import { InvoicesStore } from '../../services/invoices.store';
import { Invoice } from '../../utils/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { BreakpointsService } from '../../services/breakpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { modifyQueryParams } from 'src/app/utils';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  bp$!: Observable<string>;
  invoices$!: Observable<Invoice[]>;

  statuses: Status[] = ['draft', 'paid', 'pending'];

  statusFormGroup = this._formBuilder.group({
    draft: false,
    pending: false,
    paid: false,
  });

  getNumOfInvoicesMsg(invoices: Invoice[]) {
    if (invoices.length < 1) {
      return 'No Invoices';
    } else if (invoices.length === 1) {
      return `There is ${invoices.length} total invoice`;
    }
    return `There are ${invoices.length} total invoices`;
  }

  getNumOfInvoicesMsgMobile(invoices: Invoice[]) {
    if (invoices.length < 1) {
      return 'No Invoices';
    } else if (invoices.length === 1) {
      return `${invoices.length} invoice`;
    }
    return `${invoices.length} invoices`;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private breakpointService: BreakpointsService,
    private invoicesStore: InvoicesStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
    this.invoices$ = this.invoicesStore.filteredInvoices$;

    modifyQueryParams(this.route.queryParams)
      .pipe(
        tap((params) => {
          if (Object.entries(params).length) {
            this.statusFormGroup.setValue({ ...params });
          }
        })
      )
      .subscribe();
    this.statusFormGroup.valueChanges
      .pipe(
        tap((formData: Partial<StatusParams>) => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: formData,
            queryParamsHandling: 'merge',
          });
        })
      )
      .subscribe();
  }
}

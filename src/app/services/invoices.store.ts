import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoadingService } from '../shared/loading/loading.service';
import { Invoice } from '../utils/interfaces';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesStore {
  private mainInvoiceSubject = new BehaviorSubject<Invoice[]>([]);

  invoices$: Observable<Invoice[]> = this.mainInvoiceSubject.asObservable();

  constructor(
    private loadingService: LoadingService,
    private invoiceService: InvoiceService
  ) {
    this.loadingInvoices();
  }

  private loadingInvoices() {
    const loadInvoices$ = this.invoiceService
      .getInvoices()
      .pipe(tap((invoices) => this.mainInvoiceSubject.next(invoices)));
    this.loadingService.showLoaderUntilCompleted(loadInvoices$).subscribe();
  }
}

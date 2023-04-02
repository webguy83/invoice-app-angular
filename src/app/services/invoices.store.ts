import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Invoice } from '../utils/interfaces';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesStore {
  private mainInvoiceSubject = new BehaviorSubject<Invoice[]>([]);
  private filteredInvoicesSubject = new BehaviorSubject<Invoice[]>([]);

  invoices$: Observable<Invoice[]> = this.mainInvoiceSubject.asObservable();
  filteredInvoices$: Observable<Invoice[]> =
    this.filteredInvoicesSubject.asObservable();

  constructor(private invoiceService: InvoiceService) {
    this.loadingInvoices();
  }

  loadingInvoices() {
    const loadInvoices$ = this.invoiceService
      .getInvoices()
      .pipe(tap((invoices) => this.mainInvoiceSubject.next(invoices)));
    return loadInvoices$;
  }

  filterInvoices(invoices: Invoice[]) {
    this.filteredInvoicesSubject.next(invoices);
  }
}

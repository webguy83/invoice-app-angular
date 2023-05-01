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
  private sideNavOpenedSubject = new BehaviorSubject(true);

  sideNavOpened$ = this.sideNavOpenedSubject.asObservable();
  invoices$: Observable<Invoice[]> = this.mainInvoiceSubject.asObservable();

  filteredInvoices$: Observable<Invoice[]> =
    this.filteredInvoicesSubject.asObservable();

  constructor(private invoiceService: InvoiceService) {
    this.loadingInvoices();
  }

  loadingInvoices() {
    const loadInvoices$ = this.invoiceService.getInvoices().pipe(
      tap((invoices) => {
        this.mainInvoiceSubject.next(invoices);
      })
    );
    return loadInvoices$;
  }

  openSideNav() {
    this.sideNavOpenedSubject.next(true);
  }

  closeSideNav() {
    this.sideNavOpenedSubject.next(false);
  }

  filterInvoices(invoices: Invoice[]) {
    this.filteredInvoicesSubject.next(invoices);
  }
}

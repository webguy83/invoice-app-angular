import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Invoice } from '../utils/interfaces';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesStore {
  private mainInvoiceSubject = new BehaviorSubject<Invoice[]>([]);
  private filteredInvoicesSubject = new BehaviorSubject<Invoice[]>([]);
  private sideNavOpenedSubject = new BehaviorSubject(false);
  private invoiceEditingSubject = new BehaviorSubject<null | Invoice>(null);
  private refreshApiSubject = new Subject<Partial<Invoice>>();

  apiRefreshing$ = this.refreshApiSubject.asObservable();

  refreshApi(invoice: Partial<Invoice>) {
    this.refreshApiSubject.next(invoice);
  }

  sideNavOpened$ = this.sideNavOpenedSubject.asObservable();
  invoices$: Observable<Invoice[]> = this.mainInvoiceSubject.asObservable();
  invoiceBeingEdited$: Observable<Invoice | null> =
    this.invoiceEditingSubject.asObservable();

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

  addInvoice() {
    this.invoiceEditingSubject.next(null);
    this.openSideNav();
  }

  openSideNavEditing(invoice: Invoice) {
    this.invoiceEditingSubject.next(invoice);
    this.openSideNav();
  }

  closeSideNav() {
    this.sideNavOpenedSubject.next(false);
  }

  filterInvoices(invoices: Invoice[]) {
    this.filteredInvoicesSubject.next(invoices);
  }
}

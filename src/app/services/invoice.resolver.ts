import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, catchError, tap, EMPTY } from 'rxjs';
import { Invoice } from '../utils/interfaces';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceResolver implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    const id = route.queryParamMap.get('id');
    if (id) {
      return this.invoiceService.getInvoice(id).pipe(
        tap((job) => {
          if (!job) {
            this.router.navigate(['']);
          }
        }),
        catchError(() => {
          this.router.navigate(['']);
          return EMPTY;
        })
      );
    } else {
      this.router.navigate(['']);
      return EMPTY;
    }
  }
}

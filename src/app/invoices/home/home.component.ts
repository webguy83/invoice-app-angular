import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap, switchMap, Subscription, concatMap, of } from 'rxjs';
import { BreakpointsService } from '../../services/breakpoint.service';
import { InvoicesStore } from '../../services/invoices.store';
import { LoadingService } from '../../shared/loading/loading.service';
import { modifyQueryParams } from 'src/app/utils';
import { animations } from 'src/app/utils/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoadingService],
  animations,
})
export class HomeComponent implements OnInit, OnDestroy {
  invoices$ = this.invoiceStore.filteredInvoices$;
  isLoading$ = this.loadingService.loading$;
  $bp!: Observable<string>;
  private queryParamSubscription = new Subscription();
  private refreshSub = new Subscription();

  constructor(
    private invoiceStore: InvoicesStore,
    public loadingService: LoadingService,
    private breakpointService: BreakpointsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
    this.refreshSub.unsubscribe();
  }
  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
    this.refreshSub = this.invoiceStore.apiInvoicesRefreshing$
      .pipe(
        concatMap((refreshing) => {
          if (refreshing) {
            return this.getFilterInvoices();
          } else {
            return of(null);
          }
        })
      )
      .subscribe();

    this.queryParamSubscription = this.getFilterInvoices().subscribe();
  }

  getFilterInvoices() {
    return modifyQueryParams(this.route.queryParams).pipe(
      switchMap((params) => {
        if (Object.entries(params).length === 0) {
          return this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              pending: true,
              draft: true,
              paid: true,
            },
            queryParamsHandling: 'merge',
          });
        }
        return this.loadingService
          .showLoaderUntilCompleted(this.invoiceStore.loadingInvoices())
          .pipe(
            tap((invoices) => {
              const filteredInvoicesFromParams = invoices.filter((invoice) => {
                return invoice.status ? params[invoice.status] : false;
              });
              this.invoiceStore.filterInvoices(filteredInvoicesFromParams);
            })
          );
      })
    );
  }
}

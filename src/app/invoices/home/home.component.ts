import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap, switchMap, Subscription, map } from 'rxjs';
import { BreakpointsService } from '../../services/breakpoint.service';
import { InvoicesStore } from '../../services/invoices.store';
import { LoadingService } from '../../shared/loading/loading.service';
import { modifyQueryParams } from 'src/app/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  invoices$ = this.invoiceStore.filteredInvoices$;
  isLoading$ = this.loadingService.loading$;
  $bp!: Observable<string>;
  private queryParamSubscription = new Subscription();
  @HostBinding('class.loading') hostLoadingClass: boolean = false;

  constructor(
    private invoiceStore: InvoicesStore,
    public loadingService: LoadingService,
    private breakpointService: BreakpointsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
    this.isLoading$
      .pipe(
        tap((isLoading) => {
          if (isLoading) {
            this.hostLoadingClass = true;
          } else {
            this.hostLoadingClass = false;
          }
        })
      )
      .subscribe();
    this.loadingService
      .showLoaderUntilCompleted(this.invoiceStore.loadingInvoices())
      .subscribe();
    this.queryParamSubscription = modifyQueryParams(this.route.queryParams)
      .pipe(
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
          return this.invoiceStore.invoices$.pipe(
            tap((invoices) => {
              const filteredInvoicesFromParams = invoices.filter((invoice) => {
                return params[invoice.status];
              });
              this.invoiceStore.filterInvoices(filteredInvoicesFromParams);
            })
          );
        })
      )
      .subscribe();
  }
}
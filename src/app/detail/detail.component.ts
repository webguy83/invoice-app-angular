import { InvoicesStore } from 'src/app/services/invoices.store';
import { NavigationService } from './../services/navigation.service';
import { LoadingService } from './../shared/loading/loading.service';
import { InvoiceService } from './../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/utils/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointsService } from '../services/breakpoint.service';
import {
  Observable,
  combineLatest,
  Subscription,
  filter,
  concatMap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { openConfirmDialog } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [LoadingService],
})
export class DetailComponent implements OnInit, OnDestroy {
  $bp!: Observable<string>;
  invoice!: Invoice;
  isLoading$ = this.loadingService.loading$;
  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private breakpointService: BreakpointsService,
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private invoicesStore: InvoicesStore,
    private loadingService: LoadingService,
    private navigationService: NavigationService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.invoice = this.route.snapshot.data['invoice'];
    this.$bp = this.breakpointService.breakpoint$;
  }

  onDeleteBtnClick() {
    openConfirmDialog(this.dialog, this.invoice.id)
      .pipe(
        filter((id) => !!id),
        concatMap((id) => this.invoiceService.deleteInvoice(id))
      )
      .subscribe(() => {
        this.navigationService.back();
      });
  }

  onEditClick() {
    this.invoicesStore.openSideNavEditing(this.invoice);
  }

  onMarkAsPaidClick() {
    const obs1$ = this.invoiceService.editInvoice(this.invoice.id, {
      status: 'paid',
    });

    const obs2$ = this.invoiceService.getInvoice(this.invoice.id);

    this.loadingService
      .showLoaderUntilCompleted(combineLatest([obs1$, obs2$]))
      .subscribe((arr) => {
        this.invoice = arr[1];
      });
  }
}

import { LoadingService } from './../shared/loading/loading.service';
import { InvoiceService } from './../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/utils/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointsService } from '../services/breakpoint.service';
import {
  Observable,
  combineLatest,
  Subscription,
  filter,
  concat,
  concatMap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  openConfirmDialog,
} from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
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
    private loadingService: LoadingService,
    private router: Router
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
        this.router.navigate(['/']);
      });
  }

  onEditClick() {
    this.invoiceService.addInvoice();
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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointsService } from '../services/breakpoint.service';
import { InvoicesStore } from '../services/invoices.store';
import { LoadingService } from '../shared/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices$ = this.invoiceStore.invoices$;
  isLoading$ = this.loadingService.loading$;
  $bp!: Observable<string>;

  constructor(
    private invoiceStore: InvoicesStore,
    private loadingService: LoadingService,
    private breakpointService: BreakpointsService
  ) {}
  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
  }
}

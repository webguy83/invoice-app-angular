import { Component, OnInit } from '@angular/core';
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

  constructor(
    private invoiceStore: InvoicesStore,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {}
}

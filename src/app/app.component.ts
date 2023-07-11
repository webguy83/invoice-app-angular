import { InvoicesStore } from './services/invoices.store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointsService } from './services/breakpoint.service';
import { animations } from './utils/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations,
})
export class AppComponent implements OnInit {
  bp$!: Observable<string>;
  sideNavOpened$ = this.invoicesStore.sideNavOpened$;

  constructor(
    private breakpointService: BreakpointsService,
    private invoicesStore: InvoicesStore
  ) {}

  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
  }

  closeSideNav() {
    this.invoicesStore.closeSideNav();
  }
}

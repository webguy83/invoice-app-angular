import { Component, Input, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() detectRoutingOngoing = false;

  constructor(public loadingService: LoadingService, private router: Router) {}

  ngOnInit(): void {
    if (this.detectRoutingOngoing) {
      this.router.events.subscribe((evt) => {
        if (
          evt instanceof NavigationStart ||
          evt instanceof RouteConfigLoadStart
        ) {
          this.loadingService.loadingOn();
        } else if (
          evt instanceof NavigationEnd ||
          evt instanceof NavigationError ||
          evt instanceof NavigationCancel ||
          evt instanceof RouteConfigLoadEnd
        ) {
          this.loadingService.loadingOff();
        }
      });
    }
  }
}

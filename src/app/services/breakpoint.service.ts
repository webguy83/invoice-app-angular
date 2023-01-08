import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreakpointsService {
  private _breakpointSubject = new BehaviorSubject(Breakpoints.XSmall);
  breakpoint$ = this._breakpointSubject.asObservable();

  constructor(private responsive: BreakpointObserver) {
    this.addBreakPoint();
  }

  addBreakPoint() {
    this.responsive
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this._breakpointSubject.next('mobile');
        } else if (result.breakpoints[Breakpoints.Small]) {
          this._breakpointSubject.next('tablet');
        } else {
          this._breakpointSubject.next('desktop');
        }
      });
  }
}

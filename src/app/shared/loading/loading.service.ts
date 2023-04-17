import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  finalize,
  first,
  Observable,
  of,
  tap,
} from 'rxjs';

@Injectable()
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this._loadingSubject.asObservable();
  constructor() {}

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      first(),
      finalize(() => {
        this.loadingOff();
      })
    );
  }

  loadingOn() {
    this._loadingSubject.next(true);
  }

  loadingOff() {
    this._loadingSubject.next(false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class StyleManagerService {
  private _isDarkSubject = new BehaviorSubject(false);
  isDark$ = this._isDarkSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    if (this.localStorageService.getItem('isDark')) {
      this._isDarkSubject.next(true);
      document.body.classList.add('dark-theme');
    } else if (
      this.localStorageService.getItem('isDark') === null &&
      window.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        this._isDarkSubject.next(true);
        document.body.classList.add('dark-theme');
      }
    }
  }

  toggleTheme() {
    if (this._isDarkSubject.getValue()) {
      document.body.classList.remove('dark-theme');
      this._isDarkSubject.next(false);
      this.localStorageService.setItem('isDark', false);
    } else {
      document.body.classList.add('dark-theme');
      this._isDarkSubject.next(true);
      this.localStorageService.setItem('isDark', true);
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, data: boolean): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}

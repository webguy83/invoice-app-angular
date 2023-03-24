import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
} from '@angular/fire/firestore';
import { Invoice } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private _dbName = 'invoices';

  constructor(private readonly firestore: Firestore) {}

  getInvoices() {
    const col = collection(
      this.firestore,
      this._dbName
    ) as CollectionReference<Invoice>;
    return collectionData(col, {
      idField: 'id',
    }).pipe(
      map((invoices) => {
        return invoices.map((invoice) => {
          return {
            ...invoice,
            id: invoice.id.slice(0, 6),
          };
        });
      })
    );
  }
}

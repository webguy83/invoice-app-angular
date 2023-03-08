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
    });
  }
}

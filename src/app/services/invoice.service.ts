import { from, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Invoice } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private _dbName = 'invoices';

  constructor(private readonly firestore: Firestore) {}

  getInvoices(): Observable<Invoice[]> {
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
          };
        });
      })
    );
  }

  getInvoice(id: string) {
    const docRef = doc(this.firestore, this._dbName, id);
    return from(getDoc(docRef)).pipe(
      map((newDoc) => newDoc.data())
    ) as Observable<Invoice>;
  }
}

import { from, map, Observable, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Invoice, InvoiceResponse } from '../utils/interfaces';

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
    ) as CollectionReference<InvoiceResponse>;
    const q = query(col, orderBy('createdAt', 'desc'));
    return collectionData(q, {
      idField: 'id',
    }).pipe(
      map((invoices) => {
        return invoices.map((invoice) => {
          const invoiceDate = invoice.invoiceDate.toDate();
          const createdAt = invoice.createdAt.toDate();
          return {
            ...invoice,
            invoiceDate,
            createdAt,
          };
        });
      }),
      shareReplay()
    );
  }

  getInvoice(id: string) {
    const docRef = doc(this.firestore, this._dbName, id);
    return from(getDoc(docRef)).pipe(
      shareReplay(),
      map((newDoc) => {
        const invoice: InvoiceResponse = {
          ...newDoc.data(),
        } as InvoiceResponse;
        if (invoice) {
          const invoiceDate = invoice.invoiceDate.toDate();
          const createdAt = invoice.createdAt.toDate();
          return { ...invoice, id: newDoc.id, invoiceDate, createdAt };
        }
        return null;
      })
    ) as Observable<Invoice>;
  }

  deleteInvoice(id: string) {
    const docRef = doc(this.firestore, this._dbName, id);
    return from(deleteDoc(docRef));
  }

  editInvoice(id: string, data: any) {
    const docRef = doc(this.firestore, this._dbName, id);
    return from(updateDoc(docRef, data));
  }

  addInvoice(invoice: Partial<Invoice>) {
    return from(addDoc(collection(this.firestore, this._dbName), invoice));
  }
}

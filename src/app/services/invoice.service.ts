import { from, map, Observable } from 'rxjs';
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
  setDoc,
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
      map((newDoc) => {
        if (newDoc.data()) {
          return { ...newDoc.data(), id: newDoc.id };
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

  addInvoice() {
    return from(
      addDoc(collection(this.firestore, this._dbName), {
        createdAt: '2021-10-01',
        paymentDue: '2021-10-31',
        description: 'Landing Page Design',
        paymentTerms: 30,
        clientName: 'Thomas Wayne',
        clientEmail: 'thomas@dc.com',
        status: 'pending',
        senderAddress: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
        clientAddress: {
          street: '3964  Queens Lane',
          city: 'Gotham',
          postCode: '60457',
          country: 'United States of America',
        },
        items: [
          {
            name: 'Web Design',
            quantity: 1,
            price: 6155.91,
            total: 6155.91,
          },
        ],
        total: 6155.91,
      })
    );
  }
}

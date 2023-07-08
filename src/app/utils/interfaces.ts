import { Timestamp } from '@angular/fire/firestore';

export interface InvoiceResponse {
  id: string;
  createdAt: Timestamp;
  clientEmail: string;
  clientName: string;
  clientAddress: Address;
  invoiceDate: Timestamp;
  description: string;
  items: Item[];
  senderAddress: Address;
  status: Status;
  paymentTerms: number;
}

export interface Invoice {
  id: string;
  createdAt: Date;
  clientEmail: string;
  clientName: string;
  clientAddress: Address;
  invoiceDate: Date;
  description: string;
  items: Item[];
  senderAddress: Address;
  status: Status;
  paymentTerms: number;
}

export type Status = 'paid' | 'pending' | 'draft';

export interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface Address {
  city: string;
  country: string;
  postCode: string;
  street: string;
}

export interface StatusParams {
  pending: boolean | null;
  paid: boolean | null;
  draft: boolean | null;
}

export interface ItemListForm {
  cap_values: CapVal[];
}

export interface CapVal {
  itemName: string;
  price: number;
  qty: number;
}

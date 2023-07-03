import { Timestamp } from '@angular/fire/firestore';

export interface InvoiceResponse {
  id: string;
  clientEmail: string;
  clientName: string;
  clientAddress: Address;
  createdAt: Timestamp;
  description: string;
  items: Item[];
  senderAddress: Address;
  status: Status;
  paymentTerms: number;
}

export interface Invoice {
  id: string;
  clientEmail: string;
  clientName: string;
  clientAddress: Address;
  createdAt: Date;
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

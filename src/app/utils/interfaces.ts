export interface Invoice {
  id: string;
  clientEmail: string;
  paymentDue: string;
  clientName: string;
  clientAddress: Address;
  createdAt: string;
  description: string;
  items: Item[];
  senderAddress: Address;
  status: Status;
  total: number;
}

export type Status = 'paid' | 'pending' | 'draft';

interface Item {
  name: string;
  total: number;
  price: number;
  quantity: number;
}

interface Address {
  city: string;
  country: string;
  postCode: string;
  stress: string;
}

export interface Invoice {
  id: string;
  clientEmail: string | undefined;
  paymentDue: any;
  clientName: string | undefined;
  clientAddress: Address | undefined;
  createdAt: any;
  description: string | undefined;
  items: Item[] | undefined;
  senderAddress: Address | undefined;
  status: Status | undefined;
  total: number | undefined;
  paymentTerms: number | undefined;
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
  street: string;
}

export interface StatusParams {
  pending: boolean | null;
  paid: boolean | null;
  draft: boolean | null;
}

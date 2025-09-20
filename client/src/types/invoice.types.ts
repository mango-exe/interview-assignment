export interface Invoice {
  id: number;
  vendor_name: string;
  amount: number;
  due_date: Date;
  description: string;
  paid: boolean;
  user_id: number;
}

export interface InvoiceSuggestion {
  id: number;
  vendor_name: string;
  description: string;
}

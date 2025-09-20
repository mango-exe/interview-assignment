import type { Invoice, InvoiceSuggestion } from '../invoice.types'
export interface InvoiceState {
  invoice: Invoice | null;
  invoices: Invoice[];
  invoiceSuggestions: InvoiceSuggestion[];
}

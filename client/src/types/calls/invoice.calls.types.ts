import type { Invoice } from "../invoice.types"

export interface UserInvoicesResponse {
  data: {
    invoices: Invoice[]
    count: number
  }
}

export interface UserInvoiceResponse {
  data: {
    invoice: Invoice
  }
}

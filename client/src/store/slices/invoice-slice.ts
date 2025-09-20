import { createSlice } from '@reduxjs/toolkit'

import type { InvoiceState } from '../../types/store/invoice-state.types';

const initialState: InvoiceState = {
  invoice: null,
  invoices: [],
  invoiceSuggestions: []
}

const invoiceSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInvoices: (state, action) => {
      state.invoices = action.payload
    },
    setUserInvoice: (state, action) => {
      state.invoice = action.payload
    },
    setInvoiceSuggestions: (state, action) => {
      state.invoiceSuggestions = action.payload
    }
  }
})

const { setUserInvoices, setUserInvoice, setInvoiceSuggestions } = invoiceSlice.actions;

export const actions = {
  setUserInvoices,
  setUserInvoice,
  setInvoiceSuggestions,
}

export default invoiceSlice.reducer

import { store } from '@/store/store'
import api from '../index'
import type { UserInvoiceResponse, UserInvoicesResponse } from '@/types/calls/invoice.calls.types'

export async function getUserInvoices(page: number = 1, pageSize: number = 10): Promise<UserInvoicesResponse> {
  const token = store.getState().auth.accessToken
  const response = await api.get(`/invoices?page=${page}&limit=${pageSize}`, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

export async function getUserInvoice(id: string): Promise<UserInvoiceResponse> {
  const token = store.getState().auth.accessToken
  const response = await api.get(`/invoices/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

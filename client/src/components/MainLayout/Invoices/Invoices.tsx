import './Invoices.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { actions as errorActions } from '@/store/slices/error-slice'
import { getUserInvoices } from '@/api/calls/invoice.calls'
import { Checkbox } from '@/components/ui/checkbox'

import type { ColumnDef } from "@tanstack/react-table"
import type { Invoice } from '@/types/invoice.types'
import type { UserInvoicesResponse } from '@/types/calls/invoice.calls.types'

import InvoiceDatatable from './InvoiceDatatable/InvoiceDatatable'
import InvoiceDialog from '../InvoiceDialog'

const invoiceColumns: ColumnDef<Invoice, any>[] = [
  {
    accessorKey: "vendor_name",
    header: "Payee",
    cell: () => <Checkbox checked={false} />,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>())
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `$${getValue<number>()}`,
  },
  {
    accessorKey: "paid",
    header: "Status",
    cell: ({ getValue }) => (getValue() ? <span className='text-[var(--light-purple)]'>Paid</span> : <span className='text-[var(--light-purple)]'>Open</span>),
  },
]

const Invoices = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null)


  const { data: response, isLoading, isError, error } = useQuery<
    UserInvoicesResponse,
    Error
  >({
    queryKey: ['invoices', page, pageSize],
    queryFn: () => getUserInvoices(page + 1, pageSize),
    keepPreviousData: true,
  })

  useEffect(() => {
    if (error && isError) {
      dispatch(errorActions.addError((error as Error).message))
    }
  }, [isError, error, dispatch])

  return (
    <div className='flex items-center justify-center p-5'>
      <InvoiceDatatable
        columns={invoiceColumns}
        data={response?.data?.invoices || []}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={response?.data?.count || 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        isLoading={isLoading}
        onRowSelect={(invoiceId) => setSelectedInvoice(invoiceId)}
      />
      {selectedInvoice && <InvoiceDialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)} invoiceId={selectedInvoice} />}
    </div>
  )
}

export default Invoices

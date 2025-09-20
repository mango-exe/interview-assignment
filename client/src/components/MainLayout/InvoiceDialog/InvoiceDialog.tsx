import './InvoiceDialog.css'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from '@/components/ui/shadcn-io/spinner'

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { getUserInvoice } from '@/api/calls/invoice.calls'

import { actions as errorActions } from '@/store/slices/error-slice'
import type { UserInvoiceResponse } from '@/types/calls/invoice.calls.types'
import type { Invoice } from '@/types/invoice.types'

const InvoiceDialog = (props) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const dispatch = useDispatch()
  const { open, onOpenChange, invoiceId } = props

  const { data: response, isFetching, isError, error } = useQuery<UserInvoiceResponse>({
    queryKey: ['invoice'],
    queryFn: () => getUserInvoice(invoiceId),
    keepPreviousData: true,
  })

  useEffect(() => {
    if (error && isError) {
      dispatch(errorActions.addError((error as Error).message))
    }
  }, [isError, error, dispatch])

  useEffect(() => {
    if (response?.data?.invoice) {
      setInvoice(response.data.invoice)
    }
  }, [response])

  const handleOnOpenChange = () => {
    setInvoice(null)
    onOpenChange(false)
  }


  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange} >
      <DialogContent className="max-w-md">
        {!isFetching && invoice ?
         <>
           <DialogHeader>
             <DialogTitle>Invoice Details</DialogTitle>
             <DialogDescription>
               Information for invoice #{invoice?.id}
             </DialogDescription>
           </DialogHeader>
           <div className="space-y-2">
             <p><span className="font-semibold">Vendor:</span> {invoice?.vendor_name}</p>
             <p><span className="font-semibold">Amount:</span> ${invoice?.amount}</p>
             <p><span className="font-semibold">Due Date:</span> {new Date(invoice?.due_date).toLocaleDateString()}</p>
             <p><span className="font-semibold">Description:</span> {invoice?.description}</p>
             <p>
               <span className="font-semibold">Status:</span>{" "}
               {invoice?.paid ? (
                 <span className="text-green-600">Paid</span>
               ) : (
                 <span className="text-red-600">Open</span>
               )}
             </p>
             <p><span className="font-semibold">User ID:</span> {invoice?.user_id}</p>
           </div>
         </> : (
           <div className='flex items-center justify-center'>
             <Spinner width={50} height={50} />
           </div>
         )
        }
      </DialogContent>
    </Dialog>
  )
}

export default InvoiceDialog

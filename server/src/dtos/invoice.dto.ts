import { z } from 'zod';

export const InvoiceSchema = z.object({
  id: z.number(),
  vendor_name: z.string().min(1, 'Vendor name is required'),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  due_date: z.date().min(new Date(), 'Due date must be in the future'),
  description: z.string().min(1, 'Description is required'),
  paid: z.boolean().default(false),
  user_id: z.number().min(1, 'User ID is required'),
});

export const NewInvoiceSchema = InvoiceSchema.omit({ id: true });

export type InvoiceDTO = z.infer<typeof InvoiceSchema>;
export type NewInvoiceDTO = z.infer<typeof NewInvoiceSchema>;

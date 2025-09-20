import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InvoiceController } from 'src/controllers/invoice/invoice.controller';
import { InvoiceService } from 'src/services/invoice.service';

describe('InvoiceController', () => {
  let invoiceController: InvoiceController;
  let invoiceService: InvoiceService;

  beforeEach(() => {
    invoiceService = {
      getUserInvoices: vi.fn(),
      getInvoice: vi.fn(),
      createInvoice: vi.fn(),
    } as any;

    invoiceController = new InvoiceController(invoiceService);
  });

  describe('getUserInvoices', () => {
    it('should return paginated invoices', async () => {
      const mockInvoices = [{ id: 1 }, { id: 2 }];
      const mockCount = 2;
      (invoiceService.getUserInvoices as any).mockResolvedValue({ invoices: mockInvoices, count: mockCount });

      const req = { pagination: { skip: 0, limit: 10, page: 1 } };
      const user = { userId: 1 };

      const result = await invoiceController.getUserInvoices(req as any, user);

      expect(result).toEqual({
        timestamp: expect.any(String),
        message: '',
        data: { invoices: mockInvoices, count: mockCount },
      });
      expect(invoiceService.getUserInvoices).toHaveBeenCalledWith(user.userId, 0, 10, 1);
    });
  });

  describe('getInvoice', () => {
    it('should return a single invoice', async () => {
      const invoice = { id: 1, amount: 100 };
      (invoiceService.getInvoice as any).mockResolvedValue(invoice);

      const result = await invoiceController.getInvoice('1', { userId: 1 });

      expect(result).toEqual({
        timestamp: expect.any(String),
        message: '',
        data: { invoice },
      });
      expect(invoiceService.getInvoice).toHaveBeenCalledWith(1, 1);
    });
  });
});

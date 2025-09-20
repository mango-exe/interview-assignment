import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import { InvoiceRepository } from 'src/db/repositories/invoice.repository';

import { NewInvoiceDTO, InvoiceDTO } from 'src/dtos/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    private userRepository: UserRepository,
    private invoiceRepository: InvoiceRepository,
  ) { }

  async createInvoice(invoice: NewInvoiceDTO): Promise<InvoiceDTO> {
    const user = await this.userRepository.findById(invoice.user_id);
    if (!user) {
      throw new Error('User not found');
    }

    const newInvoice = await this.invoiceRepository.createInvoice(invoice);

    return newInvoice;
  }

  async getUserInvoices(
    userId: number,
    skip: number,
    limit: number,
    page: number,
  ): Promise<{ invoices: InvoiceDTO[]; count: number }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const pageOffset = (page - 1) * limit;
    const invoices = await this.invoiceRepository.findUserInvoices(
      userId,
      pageOffset,
      limit,
    );

    const count = await this.invoiceRepository.getUserInvoicesCount(userId);

    return {
      invoices,
      count,
    };
  }

  async getInvoice(invoiceId: number, userId: number): Promise<InvoiceDTO> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    return invoice;
  }

  async deleteInvoice(invoiceId: number): Promise<void> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    await this.invoiceRepository.deleteInvoice(invoiceId);
  }
}

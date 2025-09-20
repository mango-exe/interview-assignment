import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InvoiceDTO, NewInvoiceDTO } from 'src/dtos/invoice.dto';

@Injectable()
export class InvoiceRepository {
  constructor(private prisma: PrismaService) {}

  createInvoice(data: NewInvoiceDTO): Promise<InvoiceDTO> {
    return this.prisma.invoice.create({ data })
  }

  findById(id: number): Promise<InvoiceDTO | null> {
    const result = this.prisma.invoice.findUnique({ where: { id } });
    return result || null;
  }

  async getUserInvoicesCount(userId: number): Promise<number> {
    const count = await this.prisma.invoice.count({ where: { user_id: userId } });
    return count;
  }

  findUserInvoices(id: number, offset: number, limit: number): Promise<InvoiceDTO[]> {
    return this.prisma.invoice.findMany({
      where: { user_id: id },
      skip: offset, take: limit
    });
  }

  deleteInvoice(id: number): void {
    this.prisma.invoice.delete({ where: { id } });
  }
}

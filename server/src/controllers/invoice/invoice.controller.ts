import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvoiceService } from 'src/services/invoice.service';
import { ResponseDTO } from 'src/dtos/response.dto';
import type { NewInvoiceDTO } from 'src/dtos/invoice.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import type { JWTDto } from 'src/dtos/jwt.dto';
import type { PaginationRequest } from 'src/types/request.type';

@Controller()
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('/invoices')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUserInvoices(
    @Request()
    req: PaginationRequest,
    @User() user: JWTDto,
  ): Promise<ResponseDTO> {
    const { skip, limit, page } = req.pagination;

    const invoices = await this.invoiceService.getUserInvoices(
      user.userId,
      skip,
      limit,
      page,
    );

    const response: ResponseDTO = {
      message: '',
      data: invoices,
      timestamp: new Date().toISOString(),
    };
    return response;
  }

  @Get('/invoices/:id')
  async getInvoice(
    @Param('id') id: string,
    @User() user: JWTDto,
  ): Promise<ResponseDTO> {
    const invoiceId = parseInt(id, 10);
    const invoice = await this.invoiceService.getInvoice(
      invoiceId,
      user.userId,
    );

    const response: ResponseDTO = {
      message: '',
      data: invoice,
      timestamp: new Date().toISOString(),
    };
    return response;
  }

  @Post('/invoice')
  @HttpCode(HttpStatus.OK)
  async createInvoice(
    @Body() invoiceData: NewInvoiceDTO,
  ): Promise<ResponseDTO> {
    const invoice = await this.invoiceService.createInvoice(invoiceData);

    const response: ResponseDTO = {
      message: '',
      data: invoice,
      timestamp: new Date().toISOString(),
    };
    return response;
  }
}

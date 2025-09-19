import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from 'src/services/invoice.service';
import { UserRepository } from 'src/db/repositories/user.repository';
import { InvoiceRepository } from 'src/db/repositories/invoice.repository';

import { PaginationMiddleware } from 'src/middleware/pagination.middleware';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService, UserRepository, InvoiceRepository]

})
export class InvoiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'invoices', method: RequestMethod.GET })
  }
}

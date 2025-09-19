import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './controllers/auth/auth.module';
import { InvoiceModule } from './controllers/invoice/invoice.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [PrismaModule, AuthModule, InvoiceModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { page, limit } = req.query;

    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    req.pagination = {
      page: !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1,
      limit: !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10,
      skip: ((parsedPage || 1) - 1) * (parsedLimit || 10),
    };

    next();
  }
}

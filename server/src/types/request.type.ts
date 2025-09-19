import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    pagination?: {
      page: number;
      limit: number;
      skip: number;
    };
  }
}

export interface PaginationRequest {
  pagination: {
    skip: number;
    limit: number;
    page: number;
  };
}

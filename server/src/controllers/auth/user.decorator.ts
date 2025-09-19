import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JWTDto } from 'src/dtos/jwt.dto';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JWTDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('currentUser decorators')
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

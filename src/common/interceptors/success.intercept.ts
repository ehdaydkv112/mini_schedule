import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 여기에 라우터가 발동
    console.log('Intercept success');
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}

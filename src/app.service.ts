import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '채원 태진 미니 스케줄';
  }
}

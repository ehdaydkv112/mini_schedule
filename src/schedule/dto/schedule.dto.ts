import { ApiProperty } from '@nestjs/swagger';
import { ScheduleDetail } from './schedule.detial.dto';

export class ScheduleDto {
  title: string;
  createdAt: string;
  detailArray: ScheduleDetail[];
}

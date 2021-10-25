import { PickType } from '@nestjs/mapped-types';
import { TimetableDetail } from 'output/entities/TimetableDetail';

export class ScheduleArrayDetailDto extends PickType(TimetableDetail, ['timetableIdx', 'timeHour', 'timeMin', 'content', 'userIdx']) {}

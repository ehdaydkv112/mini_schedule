import { Module } from '@nestjs/common';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleController } from '../controller/schedule.controller';
import { TimetableDetail } from 'output/entities/TimetableDetail';
import { Timetable } from 'output/entities/Timetable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimetableDetail, Timetable])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}

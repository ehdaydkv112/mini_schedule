import { Timetable } from 'output/entities/Timetable';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Timetable)
export class ScheduleRepository extends Repository<Timetable> {}

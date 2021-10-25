import { TimetableDetail } from 'output/entities/TimetableDetail';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(TimetableDetail)
export class ScheduleDetailRepository extends Repository<TimetableDetail> {}

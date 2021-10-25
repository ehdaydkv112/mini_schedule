import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timetable } from 'output/entities/Timetable';
import { TimetableDetail } from 'output/entities/TimetableDetail';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { ScheduleArrayDetailDto } from '../dto/schedule-array-detail.dto';
import { ScheduleDto } from '../dto/schedule.dto';
import dayjs from 'dayjs';
dayjs.locale('ko');

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Timetable)
    private scheduleRepository: Repository<Timetable>,
    @InjectRepository(TimetableDetail)
    private scheduleDetailRepository: Repository<TimetableDetail>,
  ) {}

  async makeTimetable(data: ScheduleDto, user: Users) {
    const title = (await (
      await this.scheduleRepository.insert({ title: data.title, userIdx: user.userIdx, createdAt: data.createdAt })
    ).generatedMaps[0]) as { timetableIdx: number };

    const detail: ScheduleArrayDetailDto[] = data.detailArray.map((item) => {
      return {
        ...item,
        timetableIdx: title.timetableIdx,
        userIdx: user.userIdx,
      };
    });
    await this.scheduleDetailRepository.insert(detail);
  }

  async scheduleListGet(user: Users) {
    const timeTableList = await this.scheduleRepository
      .createQueryBuilder('timetable')
      .select(['timetable_idx', 'title', 'created_at'])
      .where('user_idx = :userIdx', { userIdx: user.userIdx })
      .orderBy('timetable_idx', 'DESC')
      .getRawMany();
    return timeTableList;
  }

  async scheduleDetailGet(timetable_idx: number, user: Users) {
    const timeTableDetails = await this.scheduleDetailRepository
      .createQueryBuilder('timetable_detail')
      .select(['detail_idx', 'time_hour', 'time_min', 'content'])
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .orderBy('detail_idx')
      .getRawMany();
    return timeTableDetails;
  }

  async schedulePatch(data: ScheduleDto, timetable_idx: number, user: Users) {
    await this.scheduleDetailRepository
      .createQueryBuilder('timetable_detail')
      .delete()
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .execute();
    await this.scheduleRepository
      .createQueryBuilder('timetable')
      .delete()
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .execute();

    await this.scheduleRepository.insert({
      timetableIdx: timetable_idx,
      title: data.title,
      userIdx: user.userIdx,
      createdAt: data.createdAt,
    });
    const detail: ScheduleArrayDetailDto[] = data.detailArray.map((item) => {
      return {
        ...item,
        timetableIdx: timetable_idx,
        userIdx: user.userIdx,
      };
    });
    await this.scheduleDetailRepository.insert(detail);
  }

  async scheduleDelete(timetable_idx: number, user: Users) {
    await this.scheduleDetailRepository
      .createQueryBuilder('timetable_detail')
      .delete()
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .execute();
    await this.scheduleRepository
      .createQueryBuilder('timetable')
      .delete()
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .execute();
  }

  async scheduleDetailDelete(timetable_idx: number, detail_idx: number, user: Users) {
    await this.scheduleDetailRepository
      .createQueryBuilder('timetable_detail')
      .delete()
      .where('detail_idx = :detailIdx', { detailIdx: detail_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .execute();

    const timeTableDetails = await this.scheduleDetailRepository
      .createQueryBuilder('timetable_detail')
      .select(['detail_idx', 'time_hour', 'time_min', 'content'])
      .where('timetable_idx = :timetableIdx', { timetableIdx: timetable_idx })
      .andWhere('user_idx = :userIdx', { userIdx: user.userIdx })
      .orderBy('detail_idx')
      .getRawMany();
    return timeTableDetails;
  }

  // async scheduleCheckComplete(detail_idx: number) {}
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { Users } from 'output/entities/Users';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercept';
import { JwtAuthGuard } from 'src/common/jwt/jwt.guard';
import { ScheduleDto } from '../dto/schedule.dto';
import { ScheduleService } from '../service/schedule.service';

@ApiTags('스케줄')
@Controller('schedule')
@UseInterceptors(SuccessInterceptor)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: '일정표 등록' })
  @UseGuards(JwtAuthGuard)
  @Post()
  scheduleAdd(@Body() data: ScheduleDto, @CurrentUser() user: Users) {
    console.log('Controller');
    console.log(data);
    return this.scheduleService.makeTimetable(data, user);
  }

  @ApiOperation({ summary: '일정표 리스트 확인' })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  scheduleList(@CurrentUser() user: Users) {
    return this.scheduleService.scheduleListGet(user);
  }

  @ApiOperation({ summary: '일정표 정보 확인' })
  @UseGuards(JwtAuthGuard)
  @Get('detail/:timetable_idx')
  scheduleDetail(@Param() param, @CurrentUser() user: Users) {
    const timetable_idx = parseInt(param.timetable_idx);
    return this.scheduleService.scheduleDetailGet(timetable_idx, user);
  }

  @ApiOperation({ summary: '일정표 수정' })
  @UseGuards(JwtAuthGuard)
  @Put(':timetable_idx')
  schedulePatch(@Body() data: ScheduleDto, @Param() param, @CurrentUser() user: Users) {
    const timetable_idx = parseInt(param.timetable_idx);
    return this.scheduleService.schedulePatch(data, timetable_idx, user);
  }

  @ApiOperation({ summary: '일정표 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete(':timetable_idx')
  scheduleDelete(@Param() param, @CurrentUser() user: Users) {
    const timetable_idx = parseInt(param.timetable_idx);
    return this.scheduleService.scheduleDelete(timetable_idx, user);
  }

  @ApiOperation({ summary: '일정 하나 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('detail/:detail_idx/timetable/:timetable_idx')
  scheduleDetailDelete(@Param() param, @CurrentUser() user: Users) {
    const detail_idx = parseInt(param.detail_idx);
    const timetable_idx = parseInt(param.timetable_idx);
    return this.scheduleService.scheduleDetailDelete(timetable_idx, detail_idx, user);
  }
}

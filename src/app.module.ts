import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/module/schedule.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as ormconfig from '../ormconfig';
import { Users } from 'output/entities/Users';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule, UsersModule, TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Users])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

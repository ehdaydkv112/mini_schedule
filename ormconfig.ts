/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import dotenv from 'dotenv';
dotenv.config();

let sync = false
if (process.env.SYNC === 'true') {sync = true}

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '3.36.86.179',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users],
  // migrations: [__dirname + '/src/migrations/*.ts'],
  // cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: sync,
  logging: sync,
  keepConnectionAlive: true,
};

export = config;



  // synchronize: true, // 개발환경일 때만 true 실제 환경에서는 false, 처음에 한번만 싱크로나이드해서 true해서 테이블만들고, 그 다음부턴 false, true로했다가 데이터 다날려먹음, 그냥 한번하고 나서 false로 하면 됨
  // logging: true, // 개발중일 떈 logging true로 해놓고, orm이 쿼리를 어떤 식으로 날렸는지 확인하고, 따로 튜닝작업도 해야함
  // keepConnectionAlive: true, // 이걸 켜놔야 핫리로드할 떄 계속 db 연결하고 있음
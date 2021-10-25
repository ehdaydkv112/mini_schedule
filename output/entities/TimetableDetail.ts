/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("timetable_detail", { schema: "mini_schedule" })
export class TimetableDetail {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "detail_idx",
    comment: "디테일 pk",
  })
  detailIdx: number;

  @Column("int", {
    name: "timetable_idx",
    nullable: true,
    comment: "타이틀 pk",
  })
  timetableIdx: number | null;

  @Column("int", { name: "user_idx", nullable: true, comment: "유저 idx" })
  userIdx: number | null;

  @Column("tinyint", {
    name: "time_hour",
    nullable: true,
    comment: "시",
    width: 1,
  })
  timeHour: number | null;

  @Column("tinyint", {
    name: "time_min",
    nullable: true,
    comment: "분",
    width: 1,
  })
  timeMin: number | null;

  @Column("varchar", {
    name: "content",
    nullable: true,
    comment: "내용",
    length: 2000,
  })
  content: string | null;

  @Column("date", { name: "created_at", nullable: true, comment: "생성 날짜" })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true, comment: "수정 날짜" })
  updatedAt: string | null;


  // constructor(data: {
  //   timetableIdx: number;
  //   timeHour: number;
  //   timeMin: number;
  //   Content: string;
  // }) {
  //   this.timetableIdx = data.timetableIdx;
  //   this.timeHour = data.timeHour;
  //   this.timeMin = data.timeMin;
  //   this.content = data.Content;
  // }
}

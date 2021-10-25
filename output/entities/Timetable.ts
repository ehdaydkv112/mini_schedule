/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("timetable", { schema: "mini_schedule" })
export class Timetable {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "timetable_idx",
    comment: "타이틀 pk",
  })
  timetableIdx: number;

  @Column("int", { name: "user_idx", nullable: true, comment: "유저 idx" })
  userIdx: number | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "타이틀 이름",
    length: 1000,
  })
  title: string | null;

  @Column("date", { name: "created_at", nullable: true, comment: "생성 날짜" })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true, comment: "수정 날짜" })
  updatedAt: string | null;
}
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "mini_schedule" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_idx", comment: "회원 pk" })
  userIdx: number;

  @Column("varchar", {
    name: "user_name",
    nullable: true,
    comment: "회원 이름",
    length: 100,
  })
  userName: string | null;

  @Column("varchar", {
    name: "user_password",
    nullable: true,
    comment: "회원 비밀번호",
    length: 4000,
  })
  userPassword: string | null;

  @Column("varchar", {
    name: "user_phone_number",
    nullable: true,
    comment: "회원 휴대전화 번호",
    length: 100,
  })
  userPhoneNumber: string | null;

  @Column("date", { name: "created_at", nullable: true, comment: "생성 날짜" })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true, comment: "수정 날짜" })
  updatedAt: string | null;
}


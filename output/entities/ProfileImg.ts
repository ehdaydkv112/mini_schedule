/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile_img", { schema: "mini_schedule" })
export class ProfileImg {
  @PrimaryGeneratedColumn({ type: "int", name: "profile_img_idx", comment: "pk" })
  profileImgIdx: number;

  @Column("int", {
    name: "user_idx",
    comment: "회원 번호"
  })
  userIdx: number | null;

  @Column("varchar", {
    name: "profile_img",
    comment: "회원 사진",
    length: 1000,
  })
  profileImg: string | null;

  @Column("date", { name: "created_at", nullable: true, comment: "생성 날짜" })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true, comment: "수정 날짜" })
  updatedAt: string | null;
}


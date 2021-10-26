/* eslint-disable prettier/prettier */
import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator'

export class UserDto {
  @ApiProperty({
    required: true,
    example: 'name1234',
    description: '아이디'
  })
    @IsNotEmpty()
    @Length(0, 20)
    userName: string;

    @ApiProperty({
    required: true,
    example: 'password1234',
    description: '비밀번호'
  })
  userPassword: string;
}
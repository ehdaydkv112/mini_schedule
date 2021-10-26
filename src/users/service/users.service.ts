import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { JoinRequestDto } from '../dto/join.request.dto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    // @InjectRepository(ProfileImg)
    // private profileImgRepository: Repository<ProfileImg>,

    private jwtService: JwtService,
  ) {}

  async commonLogin(data: JoinRequestDto) {
    console.log('Service commonLogin');
    const user = await this.usersRepository.findOne({
      where: { userName: data.userName },
      select: ['userIdx', 'userName', 'userPassword'],
    });
    if (!user) {
      throw new Error('error');
    }
    const comparePassword = await bcrypt.compare(data.userPassword, user.userPassword);
    if (comparePassword) {
      return this.jwtService.sign({ user: user.userIdx });
    }
    throw new Error('error');
  }

  async getUserInfo(): Promise<string> {
    console.log('Service getUserInfo');
    return 'userInfo';
  }

  async registerUsers(data: JoinRequestDto) {
    console.log('Service postUsers');
    if (!data.userName || !data.userPassword) {
      throw new Error('error');
    }
    const user = await this.usersRepository.findOne({ where: { userName: data.userName } });
    if (user) {
      throw new Error('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(data.userPassword, 12);
    await this.usersRepository.save({
      userName: data.userName,
      userPassword: hashedPassword,
    });
  }
}

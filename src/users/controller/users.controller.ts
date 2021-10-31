import { Body, ConsoleLogger, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'output/entities/Users';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercept';
import { JwtAuthGuard } from 'src/common/jwt/jwt.guard';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UsersService } from '../service/users.service';

@ApiTags('USERS')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: '유저 정보 확인' })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserInfo(@CurrentUser() user: Users) {
    console.log('Controller getUserInfo');
    const result = {
      userIdx: user.userIdx,
      userName: user.userName,
    };
    return result;
  }

  @ApiOperation({ summary: '가입', description: '아이디랑 비밀번호로 회원가입' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '에러',
  })
  @Post('join')
  join(@Body() data: JoinRequestDto) {
    console.log('Controller join');
    return this.usersService.registerUsers(data);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '에러',
  })
  @Post('login')
  logIn(@Body() data: JoinRequestDto) {
    console.log('Controller logIn');
    return this.usersService.commonLogin(data);
  }
}

import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';

export class JoinRequestDto extends PickType(UserDto, ['userName', 'userPassword'] as const) {}

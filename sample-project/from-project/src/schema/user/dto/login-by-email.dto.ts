import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginByEmail {
  @ApiProperty()
  emailAddress = '';
  @ApiProperty()
  password = '';
}

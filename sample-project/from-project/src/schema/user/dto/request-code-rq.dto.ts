import { ApiProperty } from '@nestjs/swagger';
import { Length, MaxLength, MinLength } from 'class-validator';

export class RequestCodeRQ {
  @ApiProperty()
  @Length(1, 4)
  countryCode: string;
  @ApiProperty()
  @Length(5, 15)
  mobileNumber: string;
}

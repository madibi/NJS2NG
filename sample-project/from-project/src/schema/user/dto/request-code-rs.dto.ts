import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class RequestCodeRS {
  @ApiProperty()
  status = true;
  @ApiProperty()
  message = '';
}

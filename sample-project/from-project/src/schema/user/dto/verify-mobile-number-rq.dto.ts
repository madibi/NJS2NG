import { ApiProperty } from "@nestjs/swagger";

export class VerifyMobileNumberRQ {
    @ApiProperty()
    mobileNumber:string = '';
    @ApiProperty()    
    code:string = '';
  }
  
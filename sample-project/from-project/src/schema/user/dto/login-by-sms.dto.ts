import { ApiProperty } from "@nestjs/swagger";

export class LoginBySms {
    @ApiProperty()
    mobileNumber:string = '';
    @ApiProperty()    
    code:string = '';
  }
  
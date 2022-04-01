import { ApiProperty } from "@nestjs/swagger";

export class LoginByMobileNumber {  
    mobileCountryCode:string = '';
    mobileNumber:string = '';
    password:string = '';
  }
  
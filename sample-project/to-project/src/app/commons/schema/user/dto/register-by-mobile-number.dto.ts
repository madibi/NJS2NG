import { Length, MaxLength, MinLength } from 'class-validator';

export interface RegisterByMobileNumber {
    mobileCountryCode;
    mobileNumber;
  @MinLength(4)
  @MaxLength(20)
  password;
}

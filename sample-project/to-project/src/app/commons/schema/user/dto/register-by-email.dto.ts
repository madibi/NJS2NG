import { IsEmail, MaxLength, MinLength } from 'class-validator';

export interface RegisterByEmail {    @IsEmail()    emailAddress:string;    @MinLength(4)    @MaxLength(20)    password:string;  }
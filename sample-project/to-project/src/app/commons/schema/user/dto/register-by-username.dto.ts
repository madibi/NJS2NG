import { MaxLength, MinLength } from 'class-validator';

export interface RegisterByUsername {    @MinLength(4)    @MaxLength(20)    userName:string;    @MinLength(4)    @MaxLength(20)    password:string;  }
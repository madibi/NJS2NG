import { UserPublic } from './user-public.dto';

export interface UserSemiPrivate extends UserPublic {    mobileCountryCode: string;    mobileNumber: string;    phone: string;    emailAddress: string;    address: string;    skills: string;      aboutMe: string;  }
import { Role } from '../enum/role.enum';
import { CompanyPrivate } from './company-private.dto';
import { UserInfo } from './user-info.dto';
import { UserPrivate } from './user-private.dto';

export interface Token {
  userInfo: UserInfo<UserPrivate, Role, CompanyPrivate>;
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
}

import { UserInfo } from '@commons/schema/user/dto/user-info.dto';
import { UserSemiPrivate } from '@commons/schema/user/dto/user-semi-private.dto';
import { User } from '@commons/schema/user/entity/user.entity';
import { Request } from './request.dto';
import { RequestNote } from '../entity/request-note.entity';

export interface RequestInfo {  request: Request;  notes: RequestNote[];  differenceInDays: number;  userInfo: UserInfo<UserSemiPrivate, null>;    }
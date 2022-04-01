import { UserInfo } from "./../../../schema/user/dto/user-info.dto";
import { UserSemiPrivate } from "./../../../schema/user/dto/user-semi-private.dto";
import { User } from "./../../../schema/user/entity/user.entity";
import { UserPublic } from "./../../../schema/user/dto/user-public.dto";
import { Request } from './request.dto';
import { RequestNote } from "../entity/request-note.entity";

export class RequestInfo {
  public request: Request = new Request();
  public notes: RequestNote[] = [];
  public differenceInDays: number = null;
  public userInfo: UserInfo<UserSemiPrivate, null> = new UserInfo();  
    
    public constructor(init?:Partial<RequestInfo>) {
      Object.assign(this, init);
    }  
  }
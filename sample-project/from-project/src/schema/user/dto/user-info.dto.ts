import { ImageInfo } from "./../../../schema/common/dto/image-info.dto";
import { User } from "../entity/user.entity";
import { Role } from "../enum/role.enum";
import { CompanyInfo } from "./company-info.dto";
import { CompanyPrivate } from "./company-private.dto";
import { CompanyPublic } from "./company-public.dto";
import { UserPrivate } from "./user-private.dto";
import { UserPublic } from "./user-public.dto";
import { UserSemiPrivate } from "./user-semi-private.dto";
import * as EnumRole from './../enum/role.enum';
import * as Entity_Role from './../../enum/entity/role.entity';
import { JobBackground } from "../entity/job-background.entity";
import { EducationBackground } from "../entity/education-background.entity";
import { LanguageKnowledge } from "../entity/language-knowledge.entity";
import { Folder } from "../entity/folder.entity";

export class UserInfo<
U extends UserPublic | UserSemiPrivate | UserPrivate | User = UserPublic,
R extends EnumRole.Role | Entity_Role.Role = EnumRole.Role,
C extends CompanyPublic | CompanyPrivate = CompanyPublic> {
  public user?: U;
  public roles?: R[] = [];
  public jobBackgrounds?: JobBackground[];
  public educationBackgrounds?: EducationBackground[];
  public languageKnowledges?: LanguageKnowledge[];
  public avatar? : ImageInfo = new ImageInfo;
  public wallpaper? : ImageInfo = new ImageInfo; 
  public attachment? : ImageInfo = new ImageInfo;  
  public folders?: Folder[];
  public companyInfo?: CompanyInfo<C>;  

  public constructor(init?:Partial<UserInfo<U, R, C>>) {
    Object.assign(this, init);
  }
}

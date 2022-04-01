import { Company } from "../entity/company.entity";
import { Role } from "../enum/role.enum";
import { ImageInfo } from "../../common/dto/image-info.dto";
import { UserPrivate } from './user-private.dto';
import { CompanyActivity } from './../../../schema/enum/entity/company-activity.entity';
import { CompanyPrivate } from "./company-private.dto";
import { CompanyPublic } from "./company-public.dto";

export class CompanyInfo<T extends CompanyPublic | CompanyPrivate | Company> { 
  public company: T;
  public logo : ImageInfo;
  public wallpaper : ImageInfo;
  public activities : CompanyActivity[];

  public constructor(init?:Partial<CompanyInfo<T>>) {
    Object.assign(this, init);
  }
}
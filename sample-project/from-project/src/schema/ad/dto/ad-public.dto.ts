import { ImageInfo } from "./../../../schema/common/dto/image-info.dto";
import { CompanyPrivate } from "./../../../schema/user/dto/company-private.dto";
import { CompanyPublic } from "./../../../schema/user/dto/company-public.dto";
import { Ad } from "../entity/ad.entity";
import { Request } from "../entity/request.entity";
import { Favorite } from "../entity/favorite.entity";

export class AdPublic {
    public ad: Ad;
    public companyPublic: CompanyPublic;    
    public companyLogo: ImageInfo;
    public request?: Request;
    public favorite?: Favorite;

    public constructor(init?:Partial<AdPublic>) {
      Object.assign(this, init);
    }      
  }
import { ImageInfo } from '@commons/schema/common/dto/image-info.dto';
import { CompanyPublic } from '@commons/schema/user/dto/company-public.dto';
import { Ad } from '../entity/ad.entity';
import { Request } from '../entity/request.entity';
import { Favorite } from '../entity/favorite.entity';

export interface AdPublic {  ad: Ad;  companyPublic: CompanyPublic;      companyLogo: ImageInfo;  request?: Request;  favorite?: Favorite;  }
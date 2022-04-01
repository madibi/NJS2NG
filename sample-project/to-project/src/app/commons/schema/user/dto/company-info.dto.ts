import { Company } from '../entity/company.entity';
import { ImageInfo } from '../../common/dto/image-info.dto';
import { CompanyActivity } from '@commons/schema/enum/entity/company-activity.entity';
import { CompanyPrivate } from './company-private.dto';
import { CompanyPublic } from './company-public.dto';

export interface CompanyInfo<T extends CompanyPublic | CompanyPrivate | Company> {   company: T;  logo : ImageInfo;  wallpaper : ImageInfo;  activities : CompanyActivity[];}
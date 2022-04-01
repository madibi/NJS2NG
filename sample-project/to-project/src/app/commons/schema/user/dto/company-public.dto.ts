import { CompanyActivity } from '@commons/schema/enum/entity/company-activity.entity';

export interface CompanyPublic {    id: string;      name: string;    emailAddress: string;      websiteAddress: string;    countryId?: number;    provinceId?: number;    cityId?: number;    companyPersonnelId?: number;     explain?: string;  companyActivities?: CompanyActivity[];}
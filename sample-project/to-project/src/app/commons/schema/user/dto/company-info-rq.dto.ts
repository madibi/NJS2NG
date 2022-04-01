import { ImageInfo } from '@commons/schema/common/dto/image-info.dto';

export interface CompanyInfoRQ {  id: string;  name: string;  phone: string;  emailAddress: string;  websiteAddress: string;  address: string;  lon: number;  lat: number;  countryId: number;  provinceId: number;  cityId: number;  companyPersonnelId: number;  companyActivityArr: string; // comma separated string  logo: ImageInfo;  wallpaper: ImageInfo;  explain: string;  isCompanyApproved: boolean;}
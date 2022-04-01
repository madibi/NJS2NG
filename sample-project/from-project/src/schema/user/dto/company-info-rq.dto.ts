import { ImageInfo } from "./../../../schema/common/dto/image-info.dto";

export class CompanyInfoRQ {
  public id: string;
  public name: string;
  public phone: string;
  public emailAddress: string;
  public websiteAddress: string;
  public address: string;
  public lon: number;
  public lat: number;
  public countryId: number;
  public provinceId: number;
  public cityId: number;
  public companyPersonnelId: number;
  public companyActivityArr: string; // comma separated string
  public logo: ImageInfo;
  public wallpaper: ImageInfo;
  public explain: string;
  public isCompanyApproved: boolean;
}
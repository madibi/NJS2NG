import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CompanyActivity } from "./../../../schema/enum/entity/company-activity.entity";
import { ImageInfo } from "./../../../schema/common/dto/image-info.dto";

export class CompanyPublic {
  @Expose()
  public id: string;  
  @Expose()
  public name: string;
  @Expose()
  public emailAddress: string;  
  @Expose()
  public websiteAddress: string;
  @Expose()
  public countryId?: number;
  @Expose()
  public provinceId?: number;
  @Expose()
  public cityId?: number;
  @Expose()
  public companyPersonnelId?: number; 
  @Expose()
  public explain?: string;
  public companyActivities?: CompanyActivity[];
}
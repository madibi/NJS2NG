import { Expose } from "class-transformer";
import { CompanyPublic } from "./company-public.dto";
import { UserPublic } from "./user-public.dto";

export class CompanyPrivate extends CompanyPublic {
  @Expose()
  public phone: string;
  @Expose()
  public address: string;
  @Expose()
  lon?: number;
  @Expose()
  lat?: number;
  @Expose()
  isCompanyApproved: boolean;
  
  public constructor(init?:Partial<CompanyPrivate>) {
    super();
    Object.assign(this, init);
  }
}
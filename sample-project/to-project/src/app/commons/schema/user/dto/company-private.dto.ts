import { CompanyPublic } from './company-public.dto';

export interface CompanyPrivate extends CompanyPublic {    phone: string;    address: string;  lon?: number;  lat?: number;  isCompanyApproved: boolean;}
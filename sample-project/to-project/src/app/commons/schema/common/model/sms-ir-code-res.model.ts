import { SmsIrIds } from './sms-ir-ids.model';

export interface SmsIrCodeRS {
  Ids: SmsIrIds;
  BatchKey: string;
  IsSuccessful: boolean;
  Message: string;
}

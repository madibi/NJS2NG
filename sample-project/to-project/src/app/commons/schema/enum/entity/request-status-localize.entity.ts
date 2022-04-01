import { RequestStatus } from './request-status.entity';
// TODO: requestStatusId + languageId must be unique// TODO: also for other localizes
export interface RequestStatusLocalize  {  id: number;    requestStatusId: number;  languageId: number;  name: string; }
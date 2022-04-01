import { ResponseHeader } from './response-header.model';

export interface Response<T> {  header: ResponseHeader;  body: T;  Get(): Response<T>;}
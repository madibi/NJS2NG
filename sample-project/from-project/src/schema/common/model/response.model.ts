import { ResponseHeader } from './response-header.model';

export class Response<T> {
  header: ResponseHeader = new ResponseHeader();
  body: T = null;

  public Get(): Response<T> {
    return this;
  }
}

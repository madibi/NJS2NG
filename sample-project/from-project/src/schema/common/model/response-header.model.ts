import { CheckOut } from './check-out';
import { ResponseSeo } from './response-seo.model';

export class ResponseHeader {
  processInfo: CheckOut = new CheckOut();
  methodInfo: CheckOut = new CheckOut();
  responseSeo: ResponseSeo = new ResponseSeo();
}

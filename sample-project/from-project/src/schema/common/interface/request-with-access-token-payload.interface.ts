import { AccessTokenPayload } from '../../user/model/access-token-payload.model';

export interface RequestWithAccessTokenPayload extends Request {
    accessTokenPayload: AccessTokenPayload;
  }
import { Token } from './token.dto';

export interface VerifyCodeRS {
  status;
  message: string;
  token: Token;
}

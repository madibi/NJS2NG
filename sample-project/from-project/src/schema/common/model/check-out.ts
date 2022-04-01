import { HttpStatus } from '@nestjs/common';

export class CheckOut {
  status = true;
  message = '';
  httpStatus?: HttpStatus = null;
}

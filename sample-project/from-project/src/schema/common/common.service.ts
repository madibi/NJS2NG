import { SmsType } from '../common/enum/sms-type.enum';
import { CheckOutObject } from '../common/model/check-out-object.model';
import { Sms } from '../common/entity/sms.entity';
import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CheckOut } from './../common/model/check-out';
import { ConfigService } from '@nestjs/config';
import { SmsIrTokenRs } from './model/sms-ir-token-rs.model';
import { SmsIrCodeRS } from '../common/model/sms-ir-code-res.model';
import * as bcrypt from 'bcrypt';
import { CommonFileRepository, CommonImageRepository, CommonSmsRepository } from './common.repository';
import { SmsSender } from './enum/sms-sender.enum';
import { KavehNegarVerifyRS } from './model/kaveh-negar-verify-rs.model';

@Injectable()
export class CommonService {
  
  constructor(
    @InjectRepository(CommonSmsRepository)
    private commonSmsRepository: CommonSmsRepository, 
    @InjectRepository(CommonSmsRepository)
    private commonImageRepository: CommonImageRepository, 
    @InjectRepository(CommonSmsRepository)
    private commonFileRepository: CommonFileRepository,         
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  public normalizeMobileNumber(mobileNumber: string): string {
    let normalizedMobileNumber = '';
    if (mobileNumber.length > 10 && mobileNumber.startsWith('0')) {
      normalizedMobileNumber = mobileNumber.substring(1);
    } else {
      normalizedMobileNumber = mobileNumber;
    }
    return normalizedMobileNumber;
  }
}

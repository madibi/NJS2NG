import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './../common/common.service';
import { CommonFileRepository, CommonImageRepository, CommonSmsRepository } from './../common/common.repository';
import { EnumModule } from './../../schema/enum/enum.module';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { ImageProcessorService } from '../../services/image-processor.service';
import { FileService } from './../../services/file.service';
import { LoggingService } from './../../services/logging.service';
import { SmsService } from './../../services/sms.service';

@Module({
	imports: [
 HttpModule,
    MulterModule,
    TypeOrmModule.forFeature([
      CommonSmsRepository, 
      CommonImageRepository,
      CommonFileRepository,
    ]),
    EnumModule,
    // JwtModule.register({
    //   secretOrPrivateKey: 'isItEnoughLongToProtectMyApp?',
    // }),
	],  
  providers: [
    CommonService, 
    ImageProcessorService, 
    FileService, 
    SmsService,
    LoggingService
  ],
  controllers: [],
  exports: [
    CommonService, 
    ImageProcessorService, 
    FileService, 
    TypeOrmModule, 
    SmsService,
    LoggingService
  ]
})
export class CommonModule {}

import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { 
  UserEmployeeRepository, 
  UserFolderRepository, 
  UserEmployerRepository, 
  UserUserRepository, 
  UserUserAvatarRepository, 
  UserUserWallpaperRepository,
  UserCompanyRepository, 
  UserCompanyLogoRepository, 
  UserCompanyWallpaperRepository,
  UserUserAttachmentRepository,  
} from './user.repository';
import { CommonSmsRepository } from './../common/common.repository';
import { EnumModule } from './../../schema/enum/enum.module';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { CommonModule } from './../../schema/common/common.module';

@Module({
	imports: [
   HttpModule,
    MulterModule,
    TypeOrmModule.forFeature([
      UserUserRepository, 
      UserUserAvatarRepository,
      UserUserWallpaperRepository,
      UserUserAttachmentRepository,
      UserCompanyRepository,
      UserCompanyLogoRepository,
      UserCompanyWallpaperRepository,
      UserEmployerRepository,
      UserEmployeeRepository, 
      UserFolderRepository, 
      CommonSmsRepository
    ]),
    EnumModule,
    CommonModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
    }),
	],  
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

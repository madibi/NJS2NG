import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, getManager, In, MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { MulterFileInfoDetails } from './../common/model/multer-file-info-details.model';
import { MulterFileInfo } from './../common/model/multer-file-info.model';
import {
  UserEmployeeRepository,
  UserUserAvatarRepository,
  UserCompanyWallpaperRepository,
  UserEmployerRepository,
  UserCompanyLogoRepository,
  UserUserRepository,
  UserUserWallpaperRepository,
  UserCompanyRepository,
  UserUserAttachmentRepository,
  UserFolderRepository,
} from './user.repository';
import {
  classToClass,
  classToPlain,
  deserialize,
  plainToClass,
  plainToClassFromExist,
  serialize,
} from 'class-transformer';
import { User } from './entity/user.entity';
import { RegisterByEmail } from './dto/register-by-email.dto';
import { RegisterByMobileNumber } from './dto/register-by-mobile-number.dto';
import { RegisterByUsername } from './dto/register-by-username.dto';
import { Token } from './dto/token.dto';
import { CheckOutObject } from '../common/model/check-out-object.model';
import { AccessTokenPayload } from './model/access-token-payload.model';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from './model/refresh-token-payload.model';
import { LoginByUsername } from './dto/login-by-username.dto';
import { LoginByMobileNumber } from './dto/login-by-mobile-number.dto';
import { LoginByEmail } from './dto/login-by-email.dto';
import { RefreshTokenRQ } from './dto/refresh-token-rq.dto';
import { RequestCodeRQ } from './dto/request-code-rq.dto';
import { CommonService } from './../common/common.service';
import { SmsType } from '../common/enum/sms-type.enum';
import { CheckOut } from './../common/model/check-out';
import { Sms } from '../common/entity/sms.entity';
import { PaginationRQ } from '../common/dto/pagination-rq.dto';
import { PaginationRS } from './../common/dto/pagination-rs.dto';
import { FilterType } from '../common/enum/filter-type.enum';
import { SortType } from '../common/enum/sort-type.enum';
import { UserInfo } from './dto/user-info.dto';
import { EnumCompanyActivityRepository, EnumRoleRepository } from './../enum/enum.repository';
import { UserPublic } from './dto/user-public.dto';
import { UserPrivate } from './dto/user-private.dto';

import { CommonFileRepository, CommonImageRepository } from './../../schema/common/common.repository';
import * as Entity_Image from './../../schema/common/entity/image.entity';
import * as Entity_File from './../../schema/common/entity/file.entity';
import { ImageInfo } from './../../schema/common/dto/image-info.dto';
import { FileService } from '../../services/file.service';
import { ImageProcessorService } from '../../services/image-processor.service';
import * as Enum_Role from './enum/role.enum';
import * as Entity_Role from './../enum/entity/role.entity';
import { PaginationDetails } from './../../schema/common/dto/pagination-details.dto';
import { CompanyPrivate } from './dto/company-private.dto';
import { Company } from './entity/company.entity';
import { CompanyInfoRQ } from './dto/company-info-rq.dto';
import { CompanyActivity } from './../enum/entity/company-activity.entity';
import { UserAvatar } from './entity/user-avatar.entity';
import { UserWallpaper } from './entity/user-wallpaper.entity';
import { CompanyLogo } from './entity/company-logo.entity';
import { CompanyWallpaper } from './entity/company-wallpaper.entity';
import { CompleteInfo } from './dto/complete-info.dto';
import { SmsSender } from './../../schema/common/enum/sms-sender.enum';
import { CompanyInfo } from './dto/company-info.dto';
import { UserAttachment } from './entity/user-attachment.entity';
import { JobBackground } from './entity/job-background.entity';
import { EducationBackground } from './entity/education-background.entity';
import { LanguageKnowledge } from './entity/language-knowledge.entity';
import { SmsService } from './../../services/sms.service';
import { CrudType } from './../../schema/common/enum/crud-type.enum';
import { Folder } from './entity/folder.entity';
// import { unlink } from 'fs/promises';
var fs = require('fs');

@Injectable()
export class UserService {
  constructor(

    @InjectRepository(UserUserRepository)
    private userUserRepository: UserUserRepository,
    @InjectRepository(UserUserAvatarRepository)
    private userUserAvatarRepository: UserUserAvatarRepository,
    @InjectRepository(UserUserWallpaperRepository)
    private userUserWallpaperRepository: UserUserWallpaperRepository, 
    @InjectRepository(UserUserAttachmentRepository)
    private userUserAttachmentRepository: UserUserAttachmentRepository, 
    
    @InjectRepository(UserCompanyRepository)
    private userCompanyRepository: UserCompanyRepository,    
    @InjectRepository(UserCompanyLogoRepository)
    private userCompanyLogoRepository: UserCompanyLogoRepository,    
    @InjectRepository(UserCompanyWallpaperRepository)
    private userCompanyWallpaperRepository: UserCompanyWallpaperRepository,    
    
    @InjectRepository(UserFolderRepository)
    private userFolderRepository: UserFolderRepository,    

    @InjectRepository(UserEmployerRepository)
    private userEmployerRepository: UserEmployerRepository,
    @InjectRepository(UserEmployeeRepository)
    private userEmployeeRepository: UserEmployeeRepository,
    @InjectRepository(EnumRoleRepository)
    private enumRoleRepository: EnumRoleRepository,

    @InjectRepository(CommonImageRepository)    
    private commonImageRepository: CommonImageRepository,
    @InjectRepository(CommonFileRepository)    
    private commonFileRepository: CommonFileRepository,    

    @InjectRepository(EnumCompanyActivityRepository)    
    private enumCompanyActivityRepository: EnumCompanyActivityRepository,

    private readonly jwtService: JwtService,
    private commonService: CommonService,
    private fileService: FileService,
    private imageProcessorService: ImageProcessorService, 
    private smsService: SmsService,        
  ) {}


  public async completeInfo(
    tokenInfo: AccessTokenPayload,
    completeInfo: CompleteInfo
  ): Promise<CheckOutObject<CompleteInfo>> {
    let checkOutObject = new CheckOutObject<CompleteInfo>();
    const builder = await this.userUserRepository.createQueryBuilder('user');

    const currentUser = await this.userUserRepository.findOneOrFail({
      where: {
        id: tokenInfo.userId,
      },
    });

    const hashedPassword = await bcrypt.hash(completeInfo.password, parseInt(process.env.SALT_OR_ROUNDS));

    await this.userUserRepository
    .createQueryBuilder('user')
    .update(User)
    .set({ emailAddress: completeInfo.email, password: hashedPassword })
    .where("id = :id", { id: currentUser.id })
    .execute();

    checkOutObject.object = completeInfo;
    return checkOutObject;
    }

  public async readUsers(
    paginationRQ: PaginationRQ,
  ): Promise<PaginationRS<User[]>> {
    const builder = await this.userUserRepository.createQueryBuilder('user');

    if (paginationRQ.filter.length) {
      builder.where(`id IS NOT NULL`);
      paginationRQ.filter.forEach((part) => {
        part.forEach((element) => {
          if (
            element.column === 'firstName' &&
            element.filterType == FilterType.CONTAINS
          ) {
            builder.andWhere('"firstName" LIKE :kw', {
              kw: `%${element.keyword}%`,
            });
          }
        });
      });
    }

    if (paginationRQ.sort.length) {
      let filters = {};
      paginationRQ.sort.forEach((element) => {
        filters[`"${element.column}"`] = SortType[element.sortType];
      });
      builder.orderBy(filters);
    }

    const currentPage: number = parseInt(paginationRQ.currentPage as any) || 1;
    const pageSize = parseInt(paginationRQ.pageSize as any) || 10;
    // const sql = await builder.getSql();
    const totalItems = await builder.getCount();
    const totalPages = Math.ceil(totalItems / pageSize);
    builder.offset((currentPage - 1) * pageSize).limit(pageSize);
    const items = await builder.getMany();

    return new PaginationRS<User[]>({
      paginationDetails: new PaginationDetails({
        totalItems,
        totalPages,
      }),
      items,
    });
  }

  public async readUser(query: FindOneOptions) {
    return await this.userUserRepository.findOne(query);
  }

  public async updateUser(
    userId: string,
    userInfo: UserInfo<User, Enum_Role.Role, null>,
  ): Promise<CheckOutObject<User>> {
    let checkOutObject = new CheckOutObject<User>();
    if (userId === userInfo.user.id) {
      let currentUser = await this.userUserRepository.findOneOrFail({
        where: {
          id: userId,
        },
      });

      const _updateUser: any = {
        ...currentUser,
        ...userInfo.user,
        roles: userInfo.roles,
      };
      
      checkOutObject.object = await this.userUserRepository.save(_updateUser);;
    } else {
      checkOutObject.status = false;
    }

    return checkOutObject;
  }

  public async updateUserOwner(
    type: 'PROFILE' | 'RESUME',
    tokenInfo: AccessTokenPayload,
    user: UserInfo<UserPrivate, null>,
    files: Express.Multer.File[],
  ): Promise<CheckOutObject<UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>>> {
    let checkOutObject = new CheckOutObject<UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>>();

    if (type !== 'PROFILE' && type !== 'RESUME') {
      checkOutObject.status = false;
      checkOutObject.message = 'type is undefined';
      checkOutObject.httpStatus = HttpStatus.BAD_REQUEST;
      return checkOutObject;
    }

    let avatarInfo = null;
    if (files['avatar']) {
      avatarInfo = await this.imageProcessorService.getImageInfo(files['avatar'][0]);
    }

    let wallpaperInfo = null;
    if (files['wallpaper']) {
      wallpaperInfo = await this.imageProcessorService.getImageInfo(files['wallpaper'][0]);
    } 

    let attachmentInfo = null;
    if (files['attachment']) {
      attachmentInfo = await this.imageProcessorService.getFileInfo(files['attachment'][0]);
    } 

    let currentUser = await this.userUserRepository.findOneOrFail({
      where: {
        id: tokenInfo.userId,
      },
    });

    if (!currentUser) {
      checkOutObject.status = false;
      checkOutObject.message = 'something went wrong';
      checkOutObject.httpStatus = HttpStatus.BAD_REQUEST;
      return checkOutObject;
    }

    let newAvatar: Entity_Image.Image = null;
    if (avatarInfo) {
      newAvatar = await this.convertImageOrFileToEntity('IMAGE', currentUser.id, avatarInfo, 'USER_AVATAR') as Entity_Image.Image;
    }   
    
    let newWallpaper: Entity_Image.Image = null;
    if (wallpaperInfo) {
      newWallpaper = await this.convertImageOrFileToEntity('IMAGE', currentUser.id, wallpaperInfo, 'USER_WALLPAPER') as Entity_Image.Image;
    }

    let newAttachment: Entity_File.File = null;
    if (attachmentInfo) {
      newAttachment = await this.convertImageOrFileToEntity('FILE', currentUser.id, attachmentInfo, 'USER_ATTACHMENT') as Entity_File.File;
    }      

    let updateUser: User = null;
    if (type === 'PROFILE') {
      updateUser = {
        ...currentUser,
        ...({
          firstName: user.user.firstName,
          lastName: user.user.lastName,
        }),
      } as User;
    }
    if (type === 'RESUME') {
      updateUser = {
        ...currentUser,
        ...({
          skills: user.user.skills,
        }),
      } as User;

      // reset jobBackground
      await this.userUserRepository.createQueryBuilder('jobBackground')
      .delete()
      .from(JobBackground)
      .where("userId = :userId", { userId: tokenInfo.userId })
      .execute();
      user.jobBackgrounds.map(jb => {
        delete jb.id;
        jb.userId = tokenInfo.userId;        
        return jb;
      });      
      await this.userUserRepository.createQueryBuilder('jobBackground')
      .insert()
      .into(JobBackground)
      .values(user.jobBackgrounds)
      .execute();

      // reset educationBackground
      await this.userUserRepository.createQueryBuilder('educationBackground')
      .delete()
      .from(EducationBackground)
      .where("userId = :userId", { userId: tokenInfo.userId })
      .execute();
      user.educationBackgrounds.map(eb => {
        delete eb.id;
        eb.userId = tokenInfo.userId;
        return eb;
      });      
      await this.userUserRepository.createQueryBuilder('educationBackground')
      .insert()
      .into(EducationBackground)
      .values(user.educationBackgrounds)
      .execute();    

      // reset languageKnowledge
      await this.userUserRepository.createQueryBuilder('languageKnowledge')
      .delete()
      .from(LanguageKnowledge)
      .where("userId = :userId", { userId: tokenInfo.userId })
      .execute();
      user.languageKnowledges.map(lk => {
        delete lk.id;
        lk.userId = tokenInfo.userId;
        return lk;
      });      
      await this.userUserRepository.createQueryBuilder('languageKnowledge')
      .insert()
      .into(LanguageKnowledge)
      .values(user.languageKnowledges)
      .execute();            
    }

    const userUpdate = await this.userUserRepository.save(updateUser);
    const userInfo = await this.getUserInfo(currentUser.id);
    checkOutObject.object = userInfo;

    return checkOutObject;
  }

  public async crudFolder(tokenInfo: AccessTokenPayload, crudType: CrudType, folder: Folder): Promise<CheckOutObject<Folder[]>>{
    let checkOutObject = new CheckOutObject<Folder[]>();

    if(crudType === CrudType.CREATE) {
      let query = this.userFolderRepository.createQueryBuilder('folder');
      query.where('folder."userId" = :userId', { userId: tokenInfo.userId });
      query.andWhere('folder."name" = :name', { name: folder.name })
      const req = await query.getOne() as Folder;
      if(req) {
        checkOutObject.status = false;
        checkOutObject.message = 'The name is a duplicate';
        checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;
      } else {
        delete folder.id;
        folder.userId = tokenInfo.userId;
        const addResult = await this.userFolderRepository.createQueryBuilder('folder')
              .createQueryBuilder()
              .insert()
              .into(Folder)
              .values(folder)
              .returning('*')
              .execute();              
      }
    } else {
      let query = this.userFolderRepository.createQueryBuilder('folder');
      query.where('folder."userId" = :userId', { userId: tokenInfo.userId });
      query.andWhere('folder."id" = :id', { id: folder.id })
      const req = await query.getOne() as Folder;
      if(!req) {
        checkOutObject.status = false;
        checkOutObject.message = 'The record is not exist';
        checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;
      } else {
        if(crudType === CrudType.UPDATE) {
          folder.userId = tokenInfo.userId;
          const updateResult = await this.userFolderRepository.createQueryBuilder('folder')
          .createQueryBuilder()
          .update(Folder)
          .set(folder)
          .where("id = :id", { id: folder.id })
          .returning('*')
          .execute();    
        } else if (crudType === CrudType.DELETE) {
          const delResult = await this.userUserRepository.createQueryBuilder('folder')
          .delete()
          .from(Folder)
          .where("id = :id", { id: folder.id })
          .execute();    
        } else {
          checkOutObject.status = false;
          checkOutObject.message = 'not proper crud type';
          checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;
        }
      }
    }
    if (checkOutObject.status) {
      const query = await this.userFolderRepository.createQueryBuilder('folder');
      query.where('folder."userId" = :userId', { userId: tokenInfo.userId });
      query.orderBy('folder.priority', 'ASC');
      
      checkOutObject.object = await query.getMany();
    } return checkOutObject;
  }

  public async readCompanyInfo(
    tokenInfo: AccessTokenPayload,
    ): Promise<CheckOutObject<CompanyPrivate>> {
      let checkOutObject = new CheckOutObject<CompanyPrivate>();
      
      const company = await this.userCompanyRepository.findOne({
        where: {userId: tokenInfo.userId},
        relations: ['companyActivities']
      });

      const companyPrivate = plainToClass(CompanyPrivate, company, {
        excludeExtraneousValues: true,
      });
      // re map related properties
      companyPrivate.companyActivities = company.companyActivities;

      checkOutObject.object = companyPrivate; 
      return checkOutObject;
    }

  public async updateCompanyInfo(
    tokenInfo: AccessTokenPayload,
    companyInfoRQ: CompanyInfoRQ,
    files: Express.Multer.File[],
  ): Promise<CheckOutObject<Token>> {
    let checkOutObject = new CheckOutObject<Token>();

    let logoInfo = null;
    if (files['logo']) {
      logoInfo = await this.imageProcessorService.getImageInfo(files['logo'][0]);
    }

    let wallpaperInfo = null;
    if (files['wallpaper']) {
      wallpaperInfo = await this.imageProcessorService.getImageInfo(files['wallpaper'][0]);
    } 

    let currentUser = await this.userUserRepository.findOneOrFail({
      where: {
        id: tokenInfo.userId,
      },
    });

    let currentCompany = await this.userCompanyRepository.findOne({
      where: {
        userId: tokenInfo.userId,
      },
    });    

    if (currentUser) {

      if (!currentCompany) {
        let Company = {
          userId: currentUser.id,
          name: companyInfoRQ.name,
          countryId: companyInfoRQ.countryId,
          provinceId: companyInfoRQ.provinceId,
          cityId: companyInfoRQ.cityId,
          // TODO: why before insert not working
          isCompanyApproved: true
        } as Company;


        const employerRole = await Entity_Role.Role.findOne({
          where: {
            key: Enum_Role.Role[Enum_Role.Role.EMPLOYER]
          }
        });        


        let query = this.userUserRepository.createQueryBuilder('user')
        .where('user.id = :userId', { userId: tokenInfo.userId })
        .leftJoinAndMapMany(
          'user.roles',
          'user_roles__role',
          'roles',
          '(roles."userId" = user.id)',
        )
        .insert()
        .into('user_roles__role')
        .values([
            { userId: tokenInfo.userId, roleId: employerRole.id },
        ]).execute();
         
        currentCompany = await this.userCompanyRepository.save(Company);
      }

      let newLogo: Entity_Image.Image = null;
      if (logoInfo) {
        newLogo = await this.convertImageOrFileToEntity('IMAGE', currentCompany.id, logoInfo, 'COMPANY_LOGO') as Entity_Image.Image;
      }    
      
      let newWallpaper: Entity_Image.Image = null;
      if (wallpaperInfo) {
        newWallpaper = await this.convertImageOrFileToEntity('IMAGE', currentCompany.id, wallpaperInfo, 'COMPANY_WALLPAPER') as Entity_Image.Image;        
      }
      
      let distinctCompanyActivities = []; 
      if (companyInfoRQ.companyActivityArr) {
        distinctCompanyActivities = [...new Set(companyInfoRQ.companyActivityArr.split(','))]
        .map((ca) => parseInt(ca));
      }

      const companyActivities = await CompanyActivity.find({
        where: { id: In(distinctCompanyActivities) },
      });      

      // TODO: why nestjs convert null to 'null'
      Object.keys(companyInfoRQ).forEach(key =>
      (companyInfoRQ[key] === 'null') && delete companyInfoRQ[key]);

      const updateCompany = {
        ...currentCompany,
        ...({
          name: companyInfoRQ.name,
          phone: companyInfoRQ.phone,
          emailAddress: companyInfoRQ.emailAddress,
          websiteAddress: companyInfoRQ.websiteAddress,
          address: companyInfoRQ.address,
          lon: companyInfoRQ.lon,
          lat: companyInfoRQ.lat,
          countryId: companyInfoRQ.countryId,
          provinceId: companyInfoRQ.provinceId,
          cityId: companyInfoRQ.cityId,
          companyPersonnelId: companyInfoRQ.companyPersonnelId,
          explain: companyInfoRQ.explain,
          companyActivities: companyActivities
        } as Company),
      };
      await this.userCompanyRepository.save(updateCompany);      
      checkOutObject.object = await this.prepareToken(tokenInfo.userId);;
    } else {
      checkOutObject.status = false;
      checkOutObject.message = 'something went wrong';
      checkOutObject.httpStatus = HttpStatus.BAD_REQUEST;
    }
    return checkOutObject;
  }

  public async create(
    register: RegisterByEmail | RegisterByMobileNumber | RegisterByUsername,
  ): Promise<CheckOutObject<User>> {
    const checkOutObject = new CheckOutObject<User>();

    if ('emailAddress' in register) {
      const query: FindOneOptions<User> = {
        where: {
          emailAddress: register.emailAddress,
        },
      };
      const isExist = await this.userUserRepository.find(query);
      if (isExist) {
        checkOutObject.status = false;
        checkOutObject.message = 'email address already exists';
        return checkOutObject;
      }
    } else if ('mobileNumber' in register) {
      const query: FindOneOptions<User> = {
        where: {
          mobileCountryCode: register.mobileCountryCode,
          mobileNumber: this.commonService.normalizeMobileNumber(
            register.mobileNumber,
          )
        },
      };
      const isUserExist = await this.userUserRepository.findOne(query);
      if (isUserExist) {
        checkOutObject.status = false;
        checkOutObject.message = 'mobile number already exists';
        return checkOutObject;
      }
    } else if ('userName' in register) {
      const query: FindOneOptions<User> = {
        where: {
          userName: register.userName,
        },
      };
      const isExist = await this.userUserRepository.find(query);
      if (isExist) {
        checkOutObject.status = false;
        checkOutObject.message = 'username already exists';
        return checkOutObject;
      }
    } else {
      checkOutObject.status = false;
      checkOutObject.message = 'not proper payload';
      return checkOutObject;
    }

    const defaultRoles = await Entity_Role.Role.findOne({
      where: {
        key: Enum_Role.Role[Enum_Role.Role.EMPLOYEE]
      }
    });

    const user = {
      emailAddress: 'emailAddress' in register ? register.emailAddress : null,
      mobileCountryCode:
        'mobileNumber' in register ? register.mobileCountryCode : null,
      mobileNumber: 'mobileNumber' in register ? this.commonService.normalizeMobileNumber(register.mobileNumber) : null,
      userName: 'userName' in register ? register.userName : null,
      password: register.password,
      roles: [defaultRoles]
    } as User;
    // https://github.com/typeorm/typeorm/issues/674
    const entity = Object.assign(new User(), user);
    checkOutObject.object = await this.userUserRepository.save(entity);

    return checkOutObject;
  }

  public async requestCode(
    requestCodeRQ: RequestCodeRQ,
  ): Promise<{ checkOut: CheckOut; code: string }> {
    const before = new Date(
      new Date().getTime() - parseInt(process.env.VERIFICATION_RESEND_DELAY),
    );
    const query: FindOneOptions = {
      where: {
        mobileCountryCode: requestCodeRQ.countryCode,
        mobileNumber: this.commonService.normalizeMobileNumber(
          requestCodeRQ.mobileNumber,
        ),
        type: SmsType[SmsType.VERIFICATION],
        date: MoreThan(before),
      },
      order: {
        id: 'DESC',
      },
    };
    const sentSMSes = await this.smsService.findSMSes(query);
    if (sentSMSes.length > parseInt(process.env.VERIFICATION_RESEND_Qnty)) {
      throw new HttpException(
        'you attempted more than ' +
          process.env.VERIFICATION_RESEND_Qnty +
          ' times, try after ' +
          parseInt(process.env.VERIFICATION_RESEND_Qnty) / 60000 +
          +' minutes',
        HttpStatus.BAD_REQUEST,
      );
    } else if (sentSMSes.length > 0) {
      const lastTime = sentSMSes[0].date;
      const now = new Date();
      const diffTimeInMillieSeconds = Math.abs(
        sentSMSes[0].date.getTime() - new Date().getTime(),
      );
      if (
        diffTimeInMillieSeconds <
        parseInt(process.env.VERIFICATION_RESEND_DELAY)
      ) {
        throw new HttpException(
          'try after ' +
            parseInt(process.env.VERIFICATION_RESEND_DELAY) / 60000 +
            ' minutes',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const code = (Math.floor(Math.random() * 90000) + 10000).toString();
    const hashedCode = await bcrypt.hash(
      code,
      parseInt(process.env.SALT_OR_ROUNDS),
    );
    const isDevelopMode = process.env.NODE_ENV === 'develop';

    // const content = 'your verification code is: \n' + code; // sms.ir
    const content = code; // kaveh negar

    let checkOut = new CheckOut();
    try {
      checkOut = await this.smsService.sendSms(
        requestCodeRQ.countryCode,
        this.commonService.normalizeMobileNumber(requestCodeRQ.mobileNumber),
        SmsType.VERIFICATION,
        content,
        hashedCode,
        SmsSender.KAVEH_NEGAR,
        isDevelopMode
      );
    } catch(error) {
      checkOut.status = false;
      checkOut.message = error.message;
    }
    return { checkOut, code };
  }

  public async verifyCode(
    mobileCountryCode: string,
    mobileNumber: string,
    verificationCode: string,
  ): Promise<CheckOutObject<Token>> {
    const before = new Date(
      new Date().getTime() - parseInt(process.env.VERIFICATION_CODE_EXPIRATION),
    ); //minute, second, millisecond
    const findSmsResultQuery: FindOneOptions = {
      order: {
        id: 'DESC',
      },
      where: {
        mobileCountryCode: mobileCountryCode,
        mobileNumber: this.commonService.normalizeMobileNumber(mobileNumber),
        type: SmsType[SmsType.VERIFICATION],
        date: MoreThan(before),
      },
    };

    const findSmsResult: Sms = await this.smsService.findSMS(
      findSmsResultQuery,
    );
    if (!findSmsResult) {
      throw new HttpException(
        'no proper mobile number found, or code expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      findSmsResult.content,
    );
    if (!isMatch) {
      throw new HttpException(
        'identifier or password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }

    let checkOutObject = new CheckOutObject<Token>();
    const registerByMobileNumberRQ = new RegisterByMobileNumber();
    const loginByMobileNumberRQ = new LoginByMobileNumber();
    const isUserExitsQuery: FindOneOptions = {
      where: {
        mobileCountryCode,
        mobileNumber: this.commonService.normalizeMobileNumber(mobileNumber),
      },
    };
    const isUserExits = await this.userUserRepository.findOne(isUserExitsQuery);

    if (isUserExits) {
      loginByMobileNumberRQ.mobileCountryCode = mobileCountryCode;
      loginByMobileNumberRQ.mobileNumber = this.commonService.normalizeMobileNumber(mobileNumber);
      checkOutObject = await this.login(loginByMobileNumberRQ, true);
    } else {
      registerByMobileNumberRQ.mobileCountryCode = mobileCountryCode;
      registerByMobileNumberRQ.mobileNumber = this.commonService.normalizeMobileNumber(mobileNumber);
      checkOutObject = await this.register(registerByMobileNumberRQ);
    }

    return checkOutObject;
  }

  public async register(
    register: RegisterByEmail | RegisterByMobileNumber | RegisterByUsername,
  ): Promise<CheckOutObject<Token>> {
    const checkOutObject = new CheckOutObject<Token>();
    let user: User = null;

    const result = await this.create(register);
    if (!result.status) {
      checkOutObject.status = false;
      checkOutObject.message = result.message;
      return checkOutObject;
    } else {
      user = result.object;
      // get user by roles
      const query: FindOneOptions = {
        where: {
          mobileCountryCode: user.mobileCountryCode,
          mobileNumber: user.mobileNumber,
        },
        relations: ['roles'],
      };
      user = await this.userUserRepository.findOne(query);
    }
    checkOutObject.object = await this.prepareToken(user.id);
    return checkOutObject;
  }

  public async login(
    login: LoginByEmail | LoginByMobileNumber | LoginByUsername,
    isVerifiedBySms: boolean = false,
  ): Promise<CheckOutObject<Token>> {
    const checkOutObject = new CheckOutObject<Token>();
    let user: User = null;

    if ('emailAddress' in login) {
      const query: FindOneOptions = {
        where: {
          emailAddress: login.emailAddress,
        },
      };
      user = await this.userUserRepository.findOne(query);
    } else if ('mobileNumber' in login) {
      const query: FindOneOptions = {
        where: {
          mobileCountryCode: login.mobileCountryCode,
          mobileNumber: login.mobileNumber,
        },
        relations: ['roles'],
      };
      user = await this.userUserRepository.findOne(query);
    } else if ('userName' in login) {
      const query: FindOneOptions = {
        where: {
          userName: login.userName,
        },
      };
      user = await this.userUserRepository.findOne(query);
    } else {
      checkOutObject.status = false;
      checkOutObject.message = 'not proper payload';
    }

    if (!user) {
      checkOutObject.status = false;
      checkOutObject.message = 'identifier or password is not correct';
      return checkOutObject;
    } else {
      if (!isVerifiedBySms) {
        const isMatch = await bcrypt.compare(login.password, user.password);
        if (!isMatch) {
          checkOutObject.status = false;
          checkOutObject.message = 'identifier or password is not correct';
          return checkOutObject;
        }
      }
    }

    checkOutObject.object = await this.prepareToken(user.id);
    return checkOutObject;
  }

  public decodeJwt(token: string): CheckOutObject<AccessTokenPayload> {
    const checkOutObject = new CheckOutObject<AccessTokenPayload>();
    let accessTokenPayload = new AccessTokenPayload();

    try {
      const info = this.jwtService.verify(token);
      // check if ser does not send another token
      // if (info instanceof AccessTokenPayload) {
      // } else {
      //   checkOutObject.status = false;
      //   checkOutObject.message = 'Not Proper Payload';
      //   checkOutObject.httpStatus = HttpStatus.UNAUTHORIZED;
      // }
      accessTokenPayload.roles = info.roles;
      accessTokenPayload.userId = info.userId;      
      checkOutObject.object = accessTokenPayload;
    } catch(err) {
      checkOutObject.status = false;
      checkOutObject.message = err.message;
      checkOutObject.httpStatus = HttpStatus.UNAUTHORIZED;
      // 'invalid token' - the header or payload could not be parsed
      // 'jwt malformed' - the token does not have three components (delimited by a .)
      // 'jwt signature is required'
      // 'invalid signature'
      // 'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
      // 'jwt issuer invalid. expected: [OPTIONS ISSUER]'
      // 'jwt id invalid. expected: [OPTIONS JWT ID]'
      // 'jwt subject invalid. expected: [OPTIONS SUBJECT]'      
    }

    return checkOutObject;
  }

  public async refreshToken(
    refreshTokenRQ: RefreshTokenRQ,
  ): Promise<CheckOutObject<Token>> {
    const checkOutObject = new CheckOutObject<Token>();

    // TODO: handle fake token and expired token
    // for feature need to handle token errors
    const refreshTokenPayload = this.jwtService.decode(
      refreshTokenRQ.refreshToken,
    ) as RefreshTokenPayload;

    if (refreshTokenRQ.userId == refreshTokenPayload.userId) {
      const user = await this.userUserRepository.findOne({
        where: {
          id: refreshTokenRQ.userId,
        },
        relations: ['roles'],
      });

      // TODO: here we can check to access or not
      checkOutObject.object = await this.prepareToken(user.id);
    } else {
      checkOutObject.status = false;
    }

    return checkOutObject;
  }

  private async prepareToken(userId: string): Promise<Token> {
    const accessTokenExpiresIn = process.env.TOKEN_ACCESS_TOKEN_EXPIRATION;
    const refreshTokenExpiresIn = process.env.TOKEN_REFRESH_TOKEN_EXPIRATION;         
    let userInfo: UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>  = await this.getUserInfo(userId);

    const accessTokenPayload = {
      userId: userId,
      roles: userInfo.roles,
    } as AccessTokenPayload;
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshTokenPayload: RefreshTokenPayload = {
      userId: userId,
    };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: refreshTokenExpiresIn,
    });

    return new Token({
      userInfo,
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn,
    });
  }

  private async getUserInfo(userId: string): Promise<UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>> {
    let query = this.userUserRepository.createQueryBuilder('user');
    query.leftJoinAndSelect("user_roles__role", "user_roles", `user_roles."userId" = '${userId}'`);
    query.leftJoinAndSelect(UserAvatar, "userAvatar", `"userAvatar"."userId" = '${userId}'`);  
    query.leftJoinAndSelect(UserWallpaper, "userWallpaper", `"userWallpaper"."userId" = '${userId}'`); 
    query.leftJoinAndSelect(UserAttachment, "userAttachment", `"userAttachment"."userId" = '${userId}'`);  
    query.leftJoinAndMapMany(
      'user._userRoles',
      Entity_Role.Role,
      'roles',
      'roles.id = user_roles."roleId"',            
    );
    query.leftJoinAndMapMany(
      'user._jobBackgrounds',
      JobBackground,
      'jobBackground', 
      '"jobBackground"."userId" = user.id',
    );    
    query.leftJoinAndMapMany(
      'user._educationBackgrounds',
      EducationBackground,
      'educationBackgrounds', 
      '"educationBackgrounds"."userId" = user.id',
    );    
    query.leftJoinAndMapMany(
      'user._languageKnowledges',
      LanguageKnowledge,
      'languageKnowledges', 
      '"languageKnowledges"."userId" = user.id',
    );              
    query.leftJoinAndMapOne(
      'user._userAvatar',
      Entity_Image.Image,
      'userAvatarImage',
      'userAvatarImage.id = "userAvatar"."imageId"',            
    );  
    query.leftJoinAndMapOne(
      'user._userWallpaper',
      Entity_Image.Image,
      'userWallpaperImage',
      'userWallpaperImage.id = "userWallpaper"."imageId"',            
    );   
    query.leftJoinAndMapOne(
      'user._userAttachment',
      Entity_File.File,
      'userAttachmentFile',
      'userAttachmentFile.id = "userAttachment"."fileId"',            
    );      
    query.leftJoinAndMapMany(
      'user._userFolders',
      Folder,
      'userFolder',
      '"userFolder"."userId" = user.id',            
    );   
    query.leftJoinAndMapOne(
      'user._company',
      Company,
      'company',
      'company."userId" = user.id',            
    );         
    query.leftJoinAndSelect(CompanyLogo, "companyLogo", '"companyLogo"."companyId" = company.id');  
    query.leftJoinAndSelect(CompanyWallpaper, "companyWallpaper", '"companyWallpaper"."companyId" = company.id');
    query.leftJoinAndMapOne(
      'user._companyLogo',
      Entity_Image.Image,
      'companyLogoImage',
      'companyLogoImage.id = "companyLogo"."imageId"',            
    );  
    query.leftJoinAndMapOne(
      'user._companyWallpaper',
      Entity_Image.Image,
      'companyWallpaperImage',
      'companyWallpaperImage.id = "companyWallpaper"."imageId"',            
    );    
    query.leftJoinAndSelect("company_company_activities__company_activity", 
    "company_activities", 'company_activities."companyId" = company.id');
    query.leftJoinAndMapMany(
      'user._companyActivities',
      CompanyActivity,
      'companyActivity',
      'companyActivity.id = "company_activities"."companyActivityId"',            
    );               
    query.where('user.id = :id', { id: userId })

    // console.log(query.getSql());    
    let res = await query.getOne() as any;

    const userRoles: Enum_Role.Role[] = this.convertEntityRoleToEnumRole(res._userRoles);
    const userJobBackgrounds: JobBackground[] = res._jobBackgrounds;
    const userEducationBackgrounds: EducationBackground[] = res._educationBackgrounds;
    const userLanguageKnowledges: LanguageKnowledge[] = res._languageKnowledges;
    const userAvatar = this.imageProcessorService.getImageProperties(res._userAvatar);
    const userWallpaper = this.imageProcessorService.getImageProperties(res._userWallpaper);
    const userAttachment = this.imageProcessorService.getImageProperties(res._userAttachment);
    const userFolders: Folder[] = res._userFolders ? res._userFolders : [];
    const companyPrivate = res._company ? plainToClass(CompanyPrivate, res._company, {
      excludeExtraneousValues: true,
    }) : null;    
    const companyLogo = this.imageProcessorService.getImageProperties(res._companyLogo);
    const companyWallpaper = this.imageProcessorService.getImageProperties(res._companyWallpaper);   
    const companyActivities: CompanyActivity[] = res._companyActivities;
    const userPrivate: UserPrivate = plainToClass(UserPrivate, res, {
      excludeExtraneousValues: true,
    });

    return new UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>({
      user: userPrivate,
      roles: userRoles,
      jobBackgrounds: userJobBackgrounds,
      educationBackgrounds: userEducationBackgrounds,
      languageKnowledges: userLanguageKnowledges,
      avatar: userAvatar,
      wallpaper: userWallpaper,  
      attachment: userAttachment,
      folders: userFolders,        
      companyInfo:  new CompanyInfo<CompanyPrivate>({
        company: companyPrivate,
        logo: companyLogo,
        wallpaper: companyWallpaper, 
        activities: companyActivities 
      }), 
    });
  }

  private convertEntityRoleToEnumRole(enumRoles: Entity_Role.Role[]) {
    return enumRoles ? enumRoles.map((r) => {
      return Enum_Role.Role[r.key];
    }) : null;
  }

  async convertImageOrFileToEntity(
    kind: 'IMAGE' | 'FILE',
    id: string, 
    imageInfo: MulterFileInfoDetails, 
    type: 'USER_AVATAR' | 'USER_WALLPAPER' | 'USER_ATTACHMENT' | 'COMPANY_LOGO' | 'COMPANY_WALLPAPER'
    ): Promise<Entity_Image.Image | Entity_File.File> {

    const oldUserImageQuery = {
      where: {
        userId: id,
      },
      relations: ['imageId'],
    };
    const oldUserAttachmentQuery = {
      where: {
        userId: id,
      },
      relations: ['fileId'],
    };    
    const oldCompanyImageQuery = {
      where: {
        companyId: id,
      },
      relations: ['imageId'],
    };          
    let imagePath = null;
    let filePath = null;

    // check old
    switch(type) {
      case 'USER_AVATAR':
        let oldUserAvatar = await this.userUserAvatarRepository.findOne(oldUserImageQuery);
        if (oldUserAvatar) {
          imagePath = `${process.env.SERVER_FILE_BASE_URL}${oldUserAvatar.imageId['path']}`;
          await this.commonImageRepository.delete(oldUserAvatar.imageId);
        }
        break;
      case 'USER_WALLPAPER':
        let oldUserWallpaper = await this.userUserWallpaperRepository.findOne(oldUserImageQuery);
        if (oldUserWallpaper) {
          imagePath = `${process.env.SERVER_FILE_BASE_URL}${oldUserWallpaper.imageId['path']}`;
          await this.commonImageRepository.delete(oldUserWallpaper.imageId);
        }
        break;
      case 'USER_ATTACHMENT':
        let oldUserAttachment = await this.userUserAttachmentRepository.findOne(oldUserAttachmentQuery);
        if (oldUserAttachment) {
          filePath = `${process.env.SERVER_FILE_BASE_URL}${oldUserAttachment.fileId['path']}`;
          await this.commonFileRepository.delete(oldUserAttachment.fileId);
        }
        break;        
      case 'COMPANY_LOGO':
        let oldCompanyLogo = await this.userCompanyLogoRepository.findOne(oldCompanyImageQuery);
        if (oldCompanyLogo) {
          imagePath = `${process.env.SERVER_FILE_BASE_URL}${oldCompanyLogo.imageId['path']}`;
          await this.commonImageRepository.delete(oldCompanyLogo.imageId);
        }
        break;   
      case 'COMPANY_WALLPAPER':
        let oldCompanyWallpaper = await this.userCompanyWallpaperRepository.findOne(oldCompanyImageQuery);
        if (oldCompanyWallpaper) {
          imagePath = `${process.env.SERVER_FILE_BASE_URL}${oldCompanyWallpaper.imageId['path']}`;
          await this.commonImageRepository.delete(oldCompanyWallpaper.imageId);
        }
        break;                
    }

    // delete image or file
    if (imagePath) {
      const deleteRes =  await this.fileService.remove(imagePath);
      if(!deleteRes.status) {
        // console.log(deleteRes.message);
      }
    }
    if (filePath) {
      const deleteRes =  await this.fileService.remove(filePath);
      if(!deleteRes.status) {
        // console.log(deleteRes.message);
      }
    }    

    // create new 
    let newImage: Entity_Image.Image = null;
    let newFile: Entity_File.File = null;

    let newUserInfo = null; 
    let newCompanyInfo = null;
    let newFileInfo = null;  
    if (kind === 'IMAGE') {
      const newImageProps = {
        path: imageInfo.path.replace(process.env.SERVER_FILE_BASE_URL, ''),
        width: imageInfo.width,
        height: imageInfo.height,
        averageColor: imageInfo.averageColor,
        extension: imageInfo.extension,
        mimeType: imageInfo.mimetype,
      } as Entity_Image.Image;
      newImage = await this.commonImageRepository.save(newImageProps);
      newUserInfo = {
        userId: id,
        imageId: newImage.id,
      };
      newCompanyInfo = {
        companyId: id,
        imageId: newImage.id,
      }; 
    }  
    if (kind === 'FILE') {
      const newFileProps = {
        path: imageInfo.path.replace(process.env.SERVER_FILE_BASE_URL, ''),
        extension: imageInfo.extension,
        mimeType: imageInfo.mimetype,            
      } as Entity_File.File;
      newFile = await this.commonFileRepository.save(newFileProps);
      newFileInfo = {
        userId: id,
        fileId: newFile.id,    
      };
    }      

    switch(type) {
      case 'USER_AVATAR':
        await this.userUserAvatarRepository.save(newUserInfo); 
        break;
      case 'USER_WALLPAPER':
        await this.userUserWallpaperRepository.save(newUserInfo);        
        break;
      case 'USER_ATTACHMENT':
        await this.userUserAttachmentRepository.save(newFileInfo);        
        break;        
      case 'COMPANY_LOGO':
        await this.userCompanyLogoRepository.save(newCompanyInfo);        
        break;  
      case 'COMPANY_WALLPAPER':
        await this.userCompanyWallpaperRepository.save(newCompanyInfo);        
        break;                
    }

    if (newImage) {
      return newImage;
    }
    if (newFile) {
      return newFile;
    }    
  }  
}

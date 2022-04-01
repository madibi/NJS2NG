import { Controller, Get, Put, Delete, Body, Param, Post, HttpStatus, HttpException, ParseIntPipe, DefaultValuePipe, Query, UseInterceptors, UploadedFile, UploadedFiles, HttpService, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Roles } from './../../decorators/roles.decorator';
import * as Enum_Role from './enum/role.enum';
import * as Entity_Role from './../enum/entity/role.entity';
import { CheckOutObject } from '../common/model/check-out-object.model';
import { Token } from './dto/token.dto';
import { RequestCodeRQ } from './dto/request-code-rq.dto';
import { RequestCodeRS } from './dto/request-code-rs.dto';
import { SmsType } from '../common/enum/sms-type.enum';
import { FindOneOptions, MoreThan } from 'typeorm';
import { CommonService } from './../common/common.service';
import * as bcrypt from 'bcrypt';
import { CheckOut } from './../common/model/check-out';
import { VerifyCodeRS } from './dto/verify-code-rs.dto';
import { Sms } from '../common/entity/sms.entity';
import { RegisterByMobileNumber } from './dto/register-by-mobile-number.dto';
import { LoginByMobileNumber } from './dto/login-by-mobile-number.dto';
import { RegisterByEmail } from './dto/register-by-email.dto';
import { RefreshTokenRQ } from './dto/refresh-token-rq.dto';
import { PaginationRQ } from './../../schema/common/dto/pagination-rq.dto';
import { FilterType } from './../../schema/common/enum/filter-type.enum';
import { SortType } from './../../schema/common/enum/sort-type.enum';
import { PaginationRS } from './../../schema/common/dto/pagination-rs.dto';
import { UserInfo } from './dto/user-info.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileFolder } from './../../schema/common/helper/file-folder.helper';
import { diskStorage } from 'multer';
import { ImageProcessorService } from '../../services/image-processor.service';
import { destination, fileFilter, filename, limits } from './../../config/file-upload.config';
import { TokenInfo } from './../../decorators/access-token.decorator';
import { AccessTokenPayload } from './model/access-token-payload.model';
import { User } from './entity/user.entity';
import { UserPrivate } from './dto/user-private.dto';
import { CompanyPrivate } from './dto/company-private.dto';
import { CompanyInfoRQ } from './dto/company-info-rq.dto';
import { CompleteInfo } from './dto/complete-info.dto';
import { google } from 'googleapis';
// var fs = require('fs');
import * as fs from 'fs';
import { LoginBySms } from './dto/login-by-sms.dto';
import { UserInfoTemp } from './dto/user-info-temp.dto';
import { LoggingService } from './../../services/logging.service';
import { Folder } from './entity/folder.entity';
import { CrudType } from './../../schema/common/enum/crud-type.enum';



@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {


  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private imageProcessorService: ImageProcessorService,
    private httpService: HttpService,    
    private loggingService: LoggingService
    ) {

    }
 
  @ApiExcludeEndpoint()    
  @Roles(Enum_Role.Role.ADMIN)    
  @Get('users')
  async readUsers(
    @Query('currentPage', new DefaultValuePipe(1), ParseIntPipe) currentPage: number = 1,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number = 10,    
  ): Promise<PaginationRS<User[]>> {
    
    return await this.userService.readUsers( new PaginationRQ({
      pageSize,
      currentPage,
      // filter: [[{column: 'firstName', keyword: 'mo', filterType: FilterType.CONTAINS}]],
      filter: [],
      // sort: [{column: 'firstName', sortType: SortType.ASC}]      
      sort: []
    }));
  }

  @ApiExcludeEndpoint()    
  @Roles(Enum_Role.Role.ADMIN)
  @Get('users/:id')
  async readUser(@Param('id') id: string): Promise<UserInfo<User, Enum_Role.Role, null>> {
 
    const query: FindOneOptions = {
      where: {
        id: id,
      },
      relations: ['roles']
    };
    const user = await this.userService.readUser(query);

    const userRoles: Enum_Role.Role[] = user.roles ? user.roles.map((r) => {
      return Enum_Role.Role[r.key];
    }) : null;

    const roles: Entity_Role.Role[] = user.roles;
    delete user.roles;

    let userInfo = new UserInfo<User, Enum_Role.Role, null>();
    userInfo.user = user;
    userInfo.roles = userRoles

    return userInfo;
  }  

  @ApiExcludeEndpoint()    
  @Roles(Enum_Role.Role.ADMIN)  
  @Post('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userInfo: UserInfo<User, Enum_Role.Role, null>,
  ): Promise<UserInfo<User, Enum_Role.Role, null>> {
    let checkOutObject = new CheckOutObject<User>();
    checkOutObject = await this.userService.updateUser(id, userInfo);
    if (!checkOutObject.status) {
      throw new HttpException(checkOutObject.message, HttpStatus.NOT_ACCEPTABLE);
    } else {
      const userRoles: Entity_Role.Role[] = checkOutObject.object.roles;
      const roles: Enum_Role.Role[] = userRoles ? userRoles.map((r) => {
        return Enum_Role.Role[r.key];
      }) : null;
  
      delete checkOutObject.object.roles;
      return new UserInfo<User, Enum_Role.Role, null>({
        user: checkOutObject.object,
        roles
      });      
    }
  }

  @ApiExcludeEndpoint()    
  @Roles(Enum_Role.Role.EMPLOYEE)      
  @Post('completeInfo')
  async completeInfo(
    @TokenInfo() tokenInfo: AccessTokenPayload,     
    @UploadedFiles() files: Express.Multer.File[],
    @Body() completeInfo: CompleteInfo
  ): Promise<CompleteInfo> { 
    let checkOutObject = await this.userService.completeInfo(
      tokenInfo, 
      completeInfo,
      )
    if(checkOutObject.status){
      return checkOutObject.object;
    } else {
      // TODO: delete files in error by fileService
      // this.fileService.remove ....
      // await fs.unlink(avatar.path, (err) => {
      //   console.log('file not found');
      // });
      throw new HttpException("something went wrong", HttpStatus.BAD_REQUEST);
    }
    }

  @ApiExcludeEndpoint()      
  @Roles(Enum_Role.Role.EMPLOYEE)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'avatar', maxCount: 1}, 
    {name: 'wallpaper', maxCount: 1},
    {name: 'attachment', maxCount: 1}
  ],
  {
    limits,
    fileFilter,
    storage: diskStorage({ 
      destination: (r, f, cb) => {
        if (f.fieldname === 'avatar') cb(null, FileFolder.USER_AVATAR.value);
        if (f.fieldname === 'wallpaper') cb(null, FileFolder.USER_WALLPAPER.value);        
        if (f.fieldname === 'attachment') cb(null, FileFolder.USER_ATTACHMENT.value);        
      }, 
      filename})
  }
  ))        
  @Post('users/owner/update/:type')
  async updateUserOwner(
    @TokenInfo() tokenInfo: AccessTokenPayload,     
    @UploadedFiles() files: Express.Multer.File[],
    @Param('type') type: 'PROFILE' | 'RESUME',
    @Body() userPrivateInfo: UserInfo<UserPrivate, null>
  ): Promise<UserInfo<UserPrivate, Enum_Role.Role, CompanyPrivate>> { 
    let checkOutObject = await this.userService.updateUserOwner(
      type,
      tokenInfo, 
      userPrivateInfo, 
      files,
      )
    if(checkOutObject.status){
        return checkOutObject.object;
      } else {
        // TODO: delete files in error by fileService
        // this.fileService.remove ....
        // await fs.unlink(avatar.path, (err) => {
        //   console.log('file not found');
        // });
        throw new HttpException(checkOutObject.message, checkOutObject.httpStatus);
      }
    }

  @Roles(Enum_Role.Role.EMPLOYER)       
  @Post('users/owner/folder/:crudType')
  async crudFolder(
    @TokenInfo() tokenInfo: AccessTokenPayload,     
    @Param('crudType', ParseIntPipe) crudType: CrudType,
    @Body() folder: Folder
  ): Promise<Folder[]> { 
    let checkOutObject = await this.userService.crudFolder(
      tokenInfo, 
      crudType,
      folder,
      )
    if(checkOutObject.status){
        return checkOutObject.object;
      } else {
        throw new HttpException(checkOutObject.message, checkOutObject.httpStatus);
      }
    }    
     
  @Post('requestCode')
  async requestCode(
    @Body() requestCodeRQ: RequestCodeRQ,
  ): Promise<RequestCodeRS> {
    const requestCodeRS = new RequestCodeRS();
    // this.loggingService.debug('just debug requestCode');
    // this.loggingService.error('just error requestCode');
    let {checkOut, code} = await this.userService.requestCode(requestCodeRQ);
    const testCode = process.env.NODE_ENV === 'develop' ? code : '';
    if (!checkOut.status) {
      throw new HttpException(checkOut.message, HttpStatus.SERVICE_UNAVAILABLE);
    } else {
      requestCodeRS.message = 'sms sent successfully' + ',' + testCode;
      return requestCodeRS;
    }
  }

  @ApiExcludeEndpoint()      
  @Get(
    'verifyCode/:mobileCountryCode/:mobileNumber/:verificationCode',
  )
  async verifyCode(
    @Param('mobileCountryCode') mobileCountryCode: string,
    @Param('mobileNumber') mobileNumber: string,
    @Param('verificationCode') verificationCode: string,
  ): Promise<VerifyCodeRS> {
    const verifyCodeRS = new VerifyCodeRS();

    const checkOutObject = await this.userService.verifyCode(mobileCountryCode, mobileNumber, verificationCode);

    if (!checkOutObject.status) {
      throw new HttpException(checkOutObject.message, HttpStatus.BAD_REQUEST);
    } else {
      verifyCodeRS.token = checkOutObject.object;
      return verifyCodeRS;
    }
  }

  @ApiExcludeEndpoint()      
  @Get('isEmailExists/:email')
  async isEmailExists(@Param('email') email: string): Promise<boolean> {
    const query: FindOneOptions = {
      where: {
        emailAddress: email,
      },
    };
    const result: User = await this.userService.readUser(query);
    if (!result) {
      return false;
    }

    return true;
  }

  @ApiExcludeEndpoint()      
  @Post('loginByEmail')
  async loginByEmail(
    @Body() registerByEmail: RegisterByEmail,
  ): Promise<Token> {
    const checkOutObject: CheckOutObject<Token> = await this.userService.register(
      registerByEmail,
    );
    if (!checkOutObject.status) {
      throw new HttpException(checkOutObject.message, HttpStatus.BAD_REQUEST);
    } else {
      return checkOutObject.object;
    }
  }  

  @ApiExcludeEndpoint()      
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenRQ: RefreshTokenRQ,
  ): Promise<Token> {
    let res = this.userService.refreshToken(refreshTokenRQ);
    if((await res).status) {
      return (await res).object;
    } else {
      throw new HttpException('problem in refreshing token', HttpStatus.BAD_REQUEST);
    }
  }    

  @ApiExcludeEndpoint()
  @Roles(Enum_Role.Role.EMPLOYEE)
  @Get('companies/owner')
  async companyOwner(
    @TokenInfo() tokenInfo: AccessTokenPayload, 
  ): Promise<CompanyPrivate> {
    const result = await this.userService.readCompanyInfo(tokenInfo);
    return result.object;
  }  

  @ApiExcludeEndpoint()      
  @Roles(Enum_Role.Role.EMPLOYEE)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'logo', maxCount: 1}, 
    {name: 'wallpaper', maxCount: 1}
  ],
  {
    limits,
    fileFilter,
    storage: diskStorage({ 
      destination: (r, f, cb) => {
        if (f.fieldname === 'logo') cb(null, FileFolder.COMPANY_LOGO.value);
        if (f.fieldname === 'wallpaper') cb(null, FileFolder.COMPANY_WALLPAPER.value);
      }, 
      filename})
  }
  ))        
  @Post('companies/owner/upsert')
  async updateCompanyInfo(
    @TokenInfo() tokenInfo: AccessTokenPayload,     
    @UploadedFiles() files: Express.Multer.File[],
    @Body() companyInfoRQ: CompanyInfoRQ
  ): Promise<Token> { 
    let checkOutObject = await this.userService.updateCompanyInfo(
      tokenInfo, 
      companyInfoRQ, 
      files,
      )
    if(checkOutObject.status){
      return checkOutObject.object;
    } else {
      // TODO: delete files in error by fileService
      // this.fileService.remove ....
      // await fs.unlink(avatar.path, (err) => {
      //   console.log('file not found');
      // });
      throw new HttpException(checkOutObject.message, checkOutObject.httpStatus);
    }
    }  

  @Get('sendVerificationCodeByFirebase/:phoneNumber/:recaptchaToken')
  async sendVerificationCodeByFirebase(
    @Param('phoneNumber') phoneNumber: string,
    @Param('recaptchaToken') recaptchaToken: string
  ) {
    try{
      const apiKey = 'AIzaSyBmm9CM714B9hvYV1F1hpOSeBdRAuMcXaM';
      const identityToolkit = google.identitytoolkit({
        auth: apiKey,
        version: 'v3',
      });

      const response = await identityToolkit.relyingparty.sendVerificationCode({
        requestBody: {
            // iosReceipt: "my_iosReceipt",
            // iosSecret: "my_iosSecret",
            phoneNumber,
            recaptchaToken
        },
      });
      // console.log(response.data.sessionInfo);
    } catch(e){
      // console.log(e);
    }
  }

  @Get('verifyCodeByFirebase/:sessionInfo/:code')
  async verifyCodeByFirebase(
    @Param('sessionInfo') sessionInfo: string,
    @Param('code') code: string
  ) {
    try{
      const apiKey = 'AIzaSyBmm9CM714B9hvYV1F1hpOSeBdRAuMcXaM';
      const identityToolkit = google.identitytoolkit({
        auth: apiKey,
        version: 'v3',
      });

      const response = await identityToolkit.relyingparty.verifyPhoneNumber({
        requestBody: {
            code,
            sessionInfo
        },
      });  
      // console.log(response);      
    } catch(e){
      // console.log(e);
    }
  }
}



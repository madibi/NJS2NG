import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Configuration } from './dto/configuration.dto';
import { AppService } from './app.service';
import { EmployerMainPageBestCompany } from './entity/employer-main-page-best-company.entity';
import { EmployerMainPageWhereToShow } from './entity/employer-main-page-where-to-show.entity';
import { EmployerMainPageWhyUs } from './entity/employer-main-page-why-us.entity';
import { AccessTokenPayload } from './../../schema/user/model/access-token-payload.model';
import { PageRQ } from './dto/page-rq.dto';
import { TokenInfo } from './../../decorators/access-token.decorator';

@Controller('app')
@ApiTags('app')
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('configuration')
  configuration(): Configuration {
    return this.appService.configuration();
  }

  @Get('employerMainPageBestCompanies') 
  employerMainPageBestCompanies(): Promise<EmployerMainPageBestCompany[]> {
    return this.appService.employerMainPageBestCompanies();
  }

  @Get('employerMainPageWhereToShow') 
  employerMainPageWhereToShow(): Promise<EmployerMainPageWhereToShow[]> {
    return this.appService.employerMainPageWhereToShow();
  }

  @Get('employerMainPageWhyUs') 
  employerMainPageWhyUs(): Promise<EmployerMainPageWhyUs[]> {
    return this.appService.employerMainPageWhyUs();
  }

  @Get('page/:pageName/:languageCode')
  async getPage(
    @Param('pageName') pageName: string,
    @Param('languageCode') languageCode: string      
  ): Promise<string> {
    return await this.appService.getPage(pageName, languageCode);
  }  

  @Post('page')
  async setPage(
    @TokenInfo() tokenInfo: AccessTokenPayload,      
    @Body() pageRQ: PageRQ,     
  ): Promise<string> {
    return await this.appService.setPage(pageRQ);
  }    

  @ApiExcludeEndpoint()
  @Get()
  sayHello(): string {
    return this.appService.getHello();
  }
}

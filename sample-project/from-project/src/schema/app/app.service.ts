import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckOutObject } from './../../schema/common/model/check-out-object.model';
import { Language } from './../enum/entity/language.entity';
import { 
  AppEmployerMainPageBestComponyRepository, 
  AppEmployerMainPageWhereToShowRepository, 
  AppEmployerMainPageWhyUsRepository, 
  AppPageLocalizeRepository, 
  AppPageRepository
} from './app.repository';
import { Configuration } from './dto/configuration.dto';
import { PageRQ } from './dto/page-rq.dto';
import { EmployerMainPageBestCompany } from './entity/employer-main-page-best-company.entity';
import { EmployerMainPageWhereToShow } from './entity/employer-main-page-where-to-show.entity';
import { EmployerMainPageWhyUs } from './entity/employer-main-page-why-us.entity';
import { PageLocalize } from './entity/page-localize.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(AppPageRepository)
    private appPageRepository: AppPageRepository,
    @InjectRepository(AppPageLocalizeRepository)
    private appPageLocalizeRepository: AppPageLocalizeRepository,        
    @InjectRepository(AppEmployerMainPageBestComponyRepository)
    private appEmployerMainPageBestComponyRepository: AppEmployerMainPageBestComponyRepository,
    @InjectRepository(AppEmployerMainPageWhereToShowRepository)
    private appEmployerMainPageWhereToShowRepository: AppEmployerMainPageWhereToShowRepository,
    @InjectRepository(AppEmployerMainPageWhyUsRepository)
    private appEmployerMainPageWhyUsRepository: AppEmployerMainPageWhyUsRepository,        
) {}

  getHello(): string {
    return 'Hello World!';
  }

  configuration(): Configuration {
    const configuration = new Configuration();
    configuration.language = new Language({ id: 1, code: 'en-US', name: 'english', direction: 'ltr', date: 'gregorian' });
    // TODO: get current target country id by ip location
    configuration.settings.currentTargetCountryId = '1';
    return configuration;
  }

  async getPage(pageName: string, languageCode: string): Promise<string> {
    let pageId = 0;
    let languageId = 0;    
    
    switch(pageName.toUpperCase()) {
      case 'RULES':
        pageId = 1;
        break;
      case 'ABOUT':
        pageId = 2;
        break;        
    };

    switch(languageCode.toUpperCase()) {
      case 'EN-US':
        languageId = 1;
        break;
      case 'FA-IR':
        languageId = 2;
        break;        
    };    

    let query = this.appPageLocalizeRepository.createQueryBuilder('pageLocalize');
    query.where('"pageLocalize"."pageId" = :pageId', { pageId }); 
    query.andWhere('"pageLocalize"."languageId" = :languageId', { languageId });  
    // console.log(query.getSql());    
    let res = await query.getOne();    
    return res.name;
  }  

  async setPage(pageRQ: PageRQ): Promise<string> {
    let pageId = '';
    let languageId = '';    
    
    switch(pageRQ.pageName.toUpperCase()) {
      case 'RULES':
        pageId = '1';
        break;
      case 'ABOUT':
        pageId = '2';
        break;        
    };

    switch(pageRQ.languageCode.toUpperCase()) {
      case 'EN-US':
        languageId = '1';
        break;
      case 'FA-IR':
        languageId = '2';
        break;        
    };   
    
    const res = await this.appPageLocalizeRepository
    .createQueryBuilder("pageLocalize")
    .update<PageLocalize>(PageLocalize, {name: pageRQ.content})
    .where('"PageLocalize"."pageId" = :pageId', { pageId })
    .andWhere('"PageLocalize"."languageId" = :languageId', { languageId })
    .returning(['id', 'name'])
    .updateEntity(true)
    .execute();

    return '';
  }    

  async employerMainPageBestCompanies(): Promise<EmployerMainPageBestCompany[]> {
    return await this.appEmployerMainPageBestComponyRepository.find({
      status: true
    });
  }

  async employerMainPageWhereToShow(): Promise<EmployerMainPageWhereToShow[]> {
    return await this.appEmployerMainPageWhereToShowRepository.find({
      status: true
    });
  }
  
  async employerMainPageWhyUs(): Promise<EmployerMainPageWhyUs[]> {
    return await this.appEmployerMainPageWhyUsRepository.find({
      status: true
    });
  }
}

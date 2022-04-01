import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
    EnumAdConditionRepository,
    EnumCityRepository,
    EnumCompanyActivityRepository, 
    EnumCompanyPersonnelRepository, 
    EnumContractTypeRepository, 
    EnumCountryRepository, 
    EnumDegreeCategoryRepository, 
    EnumExperienceCategoryRepository, 
    EnumGenderRepository, 
    EnumJobCategoryRepository, 
    EnumLanguageLevelRepository, 
    EnumLanguageRepository, 
    EnumMilitaryConditionCategoryRepository, 
    EnumMinimumSalaryRepository, 
    EnumProvinceRepository, 
    EnumRequestStatusRepository, 
    EnumRoleRepository 
} from './enum.repository';
import { Enum } from './dto/enum.dto';
import { EnumLanguage } from './dto/enum-language.dto';
import { LanguageName } from './dto/language-name.dto';
import { CountryLocalize } from './entity/country-localize.entity';

@Injectable()
export class EnumService {

    constructor(
        @InjectRepository(EnumAdConditionRepository)
        private enumAdConditionRepository: EnumAdConditionRepository,        
        @InjectRepository(EnumCompanyActivityRepository)
        private enumCompanyActivityRepository: EnumCompanyActivityRepository,
        @InjectRepository(EnumCompanyPersonnelRepository)
        private enumCompanyPersonnelRepository: EnumCompanyPersonnelRepository,
        @InjectRepository(EnumContractTypeRepository)
        private enumContractTypeRepository: EnumContractTypeRepository,             
        @InjectRepository(EnumDegreeCategoryRepository)
        private enumDegreeCategoryRepository: EnumDegreeCategoryRepository, 
        @InjectRepository(EnumExperienceCategoryRepository)
        private enumExperienceCategoryRepository: EnumExperienceCategoryRepository, 
        @InjectRepository(EnumGenderRepository)
        private enumGenderRepository: EnumGenderRepository, 
        @InjectRepository(EnumJobCategoryRepository)
        private enumJobCategoryRepository: EnumJobCategoryRepository, 
        @InjectRepository(EnumMilitaryConditionCategoryRepository)
        private enumMilitaryConditionCategoryRepository: EnumMilitaryConditionCategoryRepository, 
        @InjectRepository(EnumMinimumSalaryRepository)
        private enumMinimumSalaryRepository: EnumMinimumSalaryRepository, 
        @InjectRepository(EnumRequestStatusRepository)
        private enumEnumRequestStatusRepository: EnumRequestStatusRepository,         
        @InjectRepository(EnumRoleRepository)
        private enumRoleRepository: EnumRoleRepository,  
        @InjectRepository(EnumLanguageRepository)
        private enumLanguageRepository: EnumLanguageRepository,          
        @InjectRepository(EnumCountryRepository)
        private enumCountryRepository: EnumCountryRepository, 
        @InjectRepository(EnumProvinceRepository)
        private enumProvinceRepository: EnumProvinceRepository, 
        @InjectRepository(EnumCityRepository)
        private enumCityRepository: EnumCityRepository,  
        @InjectRepository(EnumLanguageLevelRepository)
        private enumLanguageLevelRepository: EnumLanguageLevelRepository,  
    ) {}    

    async keyword(): Promise<Enum> {
        let _enum = new Enum();

        const res = await Promise.all([
            this.enumAdConditionRepository.find()as any,            
            this.enumCompanyActivityRepository.find()as any,
            this.enumCompanyPersonnelRepository.find() as any,
            this.enumContractTypeRepository.find() as any,
            this.enumDegreeCategoryRepository.find() as any,
            this.enumExperienceCategoryRepository.find() as any,
            this.enumGenderRepository.find() as any,
            this.enumJobCategoryRepository.find() as any,
            this.enumMilitaryConditionCategoryRepository.find() as any,
            this.enumMinimumSalaryRepository.find() as any,            
            this.enumRoleRepository.find() as any,
            this.enumLanguageRepository.find() as any,
            this.enumCountryRepository.find() as any,
            this.enumEnumRequestStatusRepository.find() as any,
            this.enumLanguageLevelRepository.find() as any,
        ]) as any;

        _enum.adConditions = res[0];
        _enum.companyActivities = res[1];
        _enum.companyPersonnel = res[2];
        _enum.contractTypes = res[3];
        _enum.degreeCategories = res[4];
        _enum.experienceCategories = res[5];
        _enum.genders = res[6];
        _enum.jobCategories = res[7];
        _enum.militaryConditionCategories = res[8];
        _enum.minimumSalary = res[9];
        _enum.roles = res[10];
        _enum.languages = res[11];
        _enum.countries = res[12];
        _enum.requestStatuses = res[13];
        _enum.languageLevels = res[14];

        return _enum;
      }

      async enumLangs(languageId: number): Promise<EnumLanguage> {
        let _enumLang = new EnumLanguage();

        const res = await Promise.all([
            this.enumAdConditionRepository.filterLanguage(languageId) as any,             
            this.enumCompanyActivityRepository.filterLanguage(languageId) as any,
            this.enumCompanyPersonnelRepository.filterLanguage(languageId) as any,
            this.enumContractTypeRepository.filterLanguage(languageId) as any,
            this.enumDegreeCategoryRepository.filterLanguage(languageId) as any,
            this.enumExperienceCategoryRepository.filterLanguage(languageId) as any,
            this.enumGenderRepository.filterLanguage(languageId) as any,
            this.enumJobCategoryRepository.filterLanguage(languageId) as any,
            this.enumMilitaryConditionCategoryRepository.filterLanguage(languageId) as any,
            this.enumMinimumSalaryRepository.filterLanguage(languageId) as any,            
            this.enumRoleRepository.find() as any,
            this.enumLanguageRepository.find() as any,
            this.enumCountryRepository.filterLanguage(languageId) as any,
            this.enumEnumRequestStatusRepository.filterLanguage(languageId) as any,
            this.enumLanguageLevelRepository.filterLanguage(languageId) as any
        ]) as any;

        _enumLang.adConditions = res[0];
        _enumLang.companyActivities = res[1];
        _enumLang.companyPersonnel = res[2];
        _enumLang.contractTypes = res[3];
        _enumLang.degreeCategories = res[4];
        _enumLang.experienceCategories = res[5];
        _enumLang.genders = res[6];
        _enumLang.jobCategories = res[7];
        _enumLang.militaryConditionCategories = res[8];
        _enumLang.minimumSalary = res[9];
        _enumLang.roles = res[10];
        _enumLang.languages = res[11];
        _enumLang.countries = res[12];
        _enumLang.provinces = [];
        _enumLang.cities = [];
        _enumLang.requestStatuses = res[13];  
        _enumLang.languageLevels = res[14];      

        return _enumLang;
      }    
      
      async getProvinces(countryId: number, languageId): Promise<LanguageName[]> {
        return await this.enumProvinceRepository.filterLanguage(countryId, languageId);
      }

      async getCities(provinceId: number, languageId): Promise<LanguageName[]> {
        return await this.enumCityRepository.filterLanguage(provinceId, languageId);
      }      
}

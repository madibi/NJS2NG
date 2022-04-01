import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnumController } from './enum.controller';
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
    EnumLanguageRepository, 
    EnumMilitaryConditionCategoryRepository, 
    EnumMinimumSalaryRepository, 
    EnumProvinceRepository, 
    EnumRoleRepository,
    EnumRequestStatusRepository,
    EnumLanguageLevelRepository
} from './enum.repository';
import { EnumService } from './enum.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EnumAdConditionRepository,
            EnumCompanyActivityRepository,
            EnumCompanyPersonnelRepository,
            EnumContractTypeRepository, 
            EnumDegreeCategoryRepository,
            EnumExperienceCategoryRepository,
            EnumGenderRepository,
            EnumJobCategoryRepository,
            EnumMilitaryConditionCategoryRepository,
            EnumMinimumSalaryRepository,
            EnumRoleRepository,
            EnumLanguageRepository,
            EnumCountryRepository,
            EnumProvinceRepository,
            EnumCityRepository,      
            EnumRequestStatusRepository,
            EnumLanguageLevelRepository                        
          ]),
    ],
    controllers: [EnumController],
    exports: [TypeOrmModule],
    providers: [EnumService],    
})
export class EnumModule {}

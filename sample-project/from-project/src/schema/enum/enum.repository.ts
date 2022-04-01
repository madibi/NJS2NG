import { EntityRepository, getManager, Repository } from "typeorm";
import { CompanyActivity } from "./entity/company-activity.entity";
import { CompanyPersonnel } from "./entity/company-personnel.entity";
import { ContractType } from "./entity/contract-type.entity";
import { DegreeCategory } from "./entity/degree-category.entity";
import { ExperienceCategory } from "./entity/experience-category.entity";
import { Gender } from "./entity/gender.entity";
import { JobCategory } from "./entity/job-category.entity";
import { MilitaryConditionCategory } from "./entity/military-condition-category.entity";
import { Role } from "./entity/role.entity";
import { LanguageName } from './dto/language-name.dto';
import { LanguageLevel } from "./dto/language-level.dto";
import { Language } from "./entity/language.entity";
import { AdCondition } from './entity/ad-condition.entity';
import { MinimumSalary } from "./entity/minimum-salary.entity";
import { Country } from './entity/country.entity';
import { Province } from "./entity/province.entity";
import { City } from "./entity/city.entity";
import { RequestStatus } from "./entity/request-status.entity";
import * as Language_Skill from "./entity/language-level.entity";

@EntityRepository(AdCondition)
export class EnumAdConditionRepository extends Repository<AdCondition> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ac.id, ac."nameKW", acl."name"
        FROM "ENUM"."AdCondition" as ac
        JOIN "ENUM"."AdConditionLocalize" as acl
            ON ac."id" = acl."adConditionId"
        where acl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }
}

@EntityRepository(CompanyActivity)
export class EnumCompanyActivityRepository extends Repository<CompanyActivity> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ca.id, ca."nameKW", cal."name"
        FROM "ENUM"."CompanyActivity" as ca
        JOIN "ENUM"."CompanyActivityLocalize" as cal
            ON ca."id" = cal."companyActivityId"
        where cal."languageId" = $1
        `,[languageId]) as LanguageName[];
    }
}

@EntityRepository(CompanyPersonnel)
export class EnumCompanyPersonnelRepository extends Repository<CompanyPersonnel> {
    async filterLanguage(languageId: number): Promise<LanguageLevel[]> {
        return await getManager().query(`
        SELECT cp.id, cp."levelKW", cpl."level"
        FROM "ENUM"."CompanyPersonnel" as cp
        JOIN "ENUM"."CompanyPersonnelLocalize" as cpl
            ON cp."id" = cpl."companyPersonnelId"
        where cpl."languageId" = $1
        `,[languageId]) as LanguageLevel[];
    }    
}

@EntityRepository(ContractType)
export class EnumContractTypeRepository extends Repository<ContractType> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ct.id, ct."nameKW", ctl."name"
        FROM "ENUM"."ContractType" as ct
        JOIN "ENUM"."ContractTypeLocalize" as ctl
            ON ct."id" = ctl."contractTypeId"
        where ctl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }        
}

@EntityRepository(DegreeCategory)
export class EnumDegreeCategoryRepository extends Repository<DegreeCategory> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT dc.id, dc."nameKW", dcl."name"
        FROM "ENUM"."DegreeCategory" as dc
        JOIN "ENUM"."DegreeCategoryLocalize" as dcl
            ON dc."id" = dcl."degreeCategoryId"
        where dcl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }      
}

@EntityRepository(ExperienceCategory)
export class EnumExperienceCategoryRepository extends Repository<ExperienceCategory> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ec.id, ec."nameKW", ecl."name"
        FROM "ENUM"."ExperienceCategory" as ec
        JOIN "ENUM"."ExperienceCategoryLocalize" as ecl
            ON ec."id" = ecl."experienceCategoryId"
        where ecl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }      
}

@EntityRepository(Gender)
export class EnumGenderRepository extends Repository<Gender> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT g.id, g."nameKW", gl."name"
        FROM "ENUM"."Gender" as g
        JOIN "ENUM"."GenderLocalize" as gl
            ON g."id" = gl."genderId"
        where gl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }       
}

@EntityRepository(JobCategory)
export class EnumJobCategoryRepository extends Repository<Language_Skill.LanguageLevel> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT jc.id, jc."nameKW", jcl."name"
        FROM "ENUM"."JobCategory" as jc
        JOIN "ENUM"."JobCategoryLocalize" as jcl
            ON jc."id" = jcl."jobCategoryId"
        where jcl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }       
}

@EntityRepository(Language_Skill.LanguageLevel)
export class EnumLanguageLevelRepository extends Repository<JobCategory> {    
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ll.id, ll."nameKW", lll."name"
        FROM "ENUM"."LanguageLevel" as ll
        JOIN "ENUM"."LanguageLevelLocalize" as lll
            ON ll."id" = lll."languageLevelId"
        where lll."languageId" = $1
        `,[languageId]) as LanguageName[];
    }       
}


@EntityRepository(MilitaryConditionCategory)
export class EnumMilitaryConditionCategoryRepository extends Repository<MilitaryConditionCategory> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT mc.id, mc."nameKW", mcl."name"
        FROM "ENUM"."MilitaryConditionCategory" as mc
        JOIN "ENUM"."MilitaryConditionCategoryLocalize" as mcl
            ON mc."id" = mcl."militaryConditionCategoryId"
        where mcl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }        
}

@EntityRepository(MinimumSalary)
export class EnumMinimumSalaryRepository extends Repository<MinimumSalary> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT ms.id, ms."nameKW", msl."name"
        FROM "ENUM"."MinimumSalary" as ms
        JOIN "ENUM"."MinimumSalaryLocalize" as msl
            ON ms."id" = msl."minimumSalaryId"
        where msl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }        
}

@EntityRepository(RequestStatus)
export class EnumRequestStatusRepository extends Repository<RequestStatus> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT rs.id, rs."nameKW", rsl."name"
        FROM "ENUM"."RequestStatus" as rs
        JOIN "ENUM"."RequestStatusLocalize" as rsl
            ON rs."id" = rsl."requestStatusId"
        where rsl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }        
}

@EntityRepository(Role)
export class EnumRoleRepository extends Repository<Role> {
}

@EntityRepository(Language)
export class EnumLanguageRepository extends Repository<Language> { 
}

@EntityRepository(Country)
export class EnumCountryRepository extends Repository<Country> {
    async filterLanguage(languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT c.id, c."nameKW", cl."name"
        FROM "ENUM"."Country" as c
        JOIN "ENUM"."CountryLocalize" as cl
            ON c."id" = cl."countryId"
        where cl."languageId" = $1
        `,[languageId]) as LanguageName[];
    }        
}

@EntityRepository(Province)
export class EnumProvinceRepository extends Repository<Province> {
    async filterLanguage(countryId: number, languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT p.id, p."nameKW", pl."name"
        FROM "ENUM"."Province" as p
        JOIN "ENUM"."ProvinceLocalize" as pl
            ON p."id" = pl."provinceId"
        where p."countryId" = $1 AND pl."languageId" = $2
        `,[countryId, languageId]) as LanguageName[];
    }        
}

@EntityRepository(City)
export class EnumCityRepository extends Repository<City> {
    async filterLanguage(provinceId: number, languageId: number): Promise<LanguageName[]> {
        return await getManager().query(`
        SELECT c.id, c."nameKW", cl."name"
        FROM "ENUM"."City" as c
        JOIN "ENUM"."CityLocalize" as cl
            ON c."id" = cl."cityId"
        where c."provinceId" = $1 AND cl."languageId" = $2
        `,[provinceId, languageId]) as LanguageName[];    
    }
}
import { Role } from "./../../../schema/user/enum/role.enum";
import { AdCondition } from "../entity/ad-condition.entity";
import { Language } from "../entity/language.entity";
import { MinimumSalary } from "../entity/minimum-salary.entity";
import { LanguageLevel } from "./language-level.dto";
import { LanguageName } from "./language-name.dto";
import { Country } from './../entity/country.entity';
import { Province } from "../entity/province.entity";
import { City } from './../entity/city.entity';

export class EnumLanguage {
    adConditions: AdCondition[];     
    companyActivities: LanguageName[];
    companyPersonnel: LanguageLevel[];
    contractTypes: LanguageName[];
    degreeCategories: LanguageName[];
    experienceCategories: LanguageName[];
    genders: LanguageName[];
    jobCategories: LanguageName[];
    militaryConditionCategories: LanguageName[];
    minimumSalary: MinimumSalary[];
    roles: Role[];  
    languages: Language[]; 
    countries: LanguageName[];
    provinces: LanguageName[]; 
    cities: LanguageName[];  
    requestStatuses: LanguageName[];  
    languageLevels: LanguageName[];    
}
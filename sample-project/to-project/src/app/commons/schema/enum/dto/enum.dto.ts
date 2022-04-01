import { Role } from '@commons/schema/user/enum/role.enum';
import { AdCondition } from '../entity/ad-condition.entity';
import { City } from '../entity/city.entity';
import { CompanyActivity } from '../entity/company-activity.entity';
import { CompanyPersonnel } from '../entity/company-personnel.entity';
import { ContractType } from '../entity/contract-type.entity';
import { Country } from '../entity/country.entity';
import { DegreeCategory } from '../entity/degree-category.entity';
import { ExperienceCategory } from '../entity/experience-category.entity';
import { Gender } from '../entity/gender.entity';
import { JobCategory } from '../entity/job-category.entity';
import { Language } from '../entity/language.entity';
import { MilitaryConditionCategory } from '../entity/military-condition-category.entity';
import { MinimumSalary } from '../entity/minimum-salary.entity';
import { Province } from '../entity/province.entity';
import { RequestStatus } from '../entity/request-status.entity';
import { LanguageLevel } from '../entity/language-level.entity';

export interface Enum {    adConditions: AdCondition[];        companyActivities: CompanyActivity[];    companyPersonnel: CompanyPersonnel[];    contractTypes: ContractType[];    degreeCategories: DegreeCategory[];    experienceCategories: ExperienceCategory[];    genders: Gender[];    jobCategories: JobCategory[];    militaryConditionCategories: MilitaryConditionCategory[];    minimumSalary: MinimumSalary[];    roles: Role[];        languages: Language[];    countries: Country[];    provinces: Province[];    cities: City[];    requestStatuses: RequestStatus[];    languageLevels: LanguageLevel[];}
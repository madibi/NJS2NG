import { Repository, EntityRepository } from 'typeorm';
import { EmployerMainPageBestCompany } from './entity/employer-main-page-best-company.entity';
import { EmployerMainPageWhereToShow } from './entity/employer-main-page-where-to-show.entity';
import { EmployerMainPageWhyUs } from './entity/employer-main-page-why-us.entity';
import { PageLocalize } from './entity/page-localize.entity';
import { Page } from './entity/page.entity';

@EntityRepository(Page)
export class AppPageRepository extends Repository<Page> {
}

@EntityRepository(PageLocalize)
export class AppPageLocalizeRepository extends Repository<PageLocalize> {
}

@EntityRepository(EmployerMainPageBestCompany)
export class AppEmployerMainPageBestComponyRepository extends Repository<EmployerMainPageBestCompany> {
}

@EntityRepository(EmployerMainPageWhereToShow)
export class AppEmployerMainPageWhereToShowRepository extends Repository<EmployerMainPageWhereToShow> {
}

@EntityRepository(EmployerMainPageWhyUs)
export class AppEmployerMainPageWhyUsRepository extends Repository<EmployerMainPageWhyUs> {
}
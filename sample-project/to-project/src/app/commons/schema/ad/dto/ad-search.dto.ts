import { PaginationRQ } from '@commons/schema/common/dto/pagination-rq.dto';
import { AdSearchForm } from './ad-search-form.dto';
import { NearBy } from './near-by.dto';

export interface AdSearch {  keyword: string;  nearBy: NearBy;  paginationRQ: PaginationRQ;  adSearchForm: AdSearchForm;  defaultLanguageId: number;  }
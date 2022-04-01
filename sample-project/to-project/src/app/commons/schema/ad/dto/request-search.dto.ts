import { PaginationRQ } from '@commons/schema/common/dto/pagination-rq.dto';
import { RequestSearchForm } from './request-search-form.dto';

export interface RequestSearch {  keyword: string;  paginationRQ: PaginationRQ;  requestSearchForm: RequestSearchForm;  defaultLanguageId: number;  }
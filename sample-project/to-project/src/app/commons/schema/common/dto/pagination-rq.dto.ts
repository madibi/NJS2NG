import { PaginationPageSize } from '../enum/pagination-page-size.enum';
import { PaginationFilter } from './pagination-filter.dto';
import { PaginationSort } from './pagination-sort.dto';

export interface PaginationRQ {  currentPage: number;  pageSize: PaginationPageSize;  sort?: PaginationSort[];    filter?: PaginationFilter[][]; // [and]or[and]}
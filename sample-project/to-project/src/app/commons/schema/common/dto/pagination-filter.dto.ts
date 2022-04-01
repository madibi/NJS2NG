import { FilterType } from '../enum/filter-type.enum';

export interface PaginationFilter {  column: string;  keyword: any;  filterType: FilterType;}
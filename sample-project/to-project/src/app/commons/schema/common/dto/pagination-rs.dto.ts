import { PaginationDetails } from './pagination-details.dto';

export interface PaginationRS<T> {  paginationDetails: PaginationDetails;  items: T;}
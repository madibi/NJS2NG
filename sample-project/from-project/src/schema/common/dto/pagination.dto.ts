
import { PaginationLinks } from "./pagination-links.dto";
import { PaginationMeta } from "./pagination-meta.dto";

export class Pagination<T> {
    items: T[];
    meta: PaginationMeta;
    links?: PaginationLinks;
}

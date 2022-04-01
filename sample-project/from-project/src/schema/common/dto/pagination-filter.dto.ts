import { FilterType } from "../enum/filter-type.enum";
import { SortType } from "../enum/sort-type.enum";

export class PaginationFilter {
    public column: string;
    public keyword: any;
    public filterType: FilterType;

    public constructor(init?:Partial<PaginationFilter>) {
        Object.assign(this, init);
    }
}

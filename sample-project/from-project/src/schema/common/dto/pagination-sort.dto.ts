import { FilterType } from "../enum/filter-type.enum";
import { SortType } from "../enum/sort-type.enum";

export class PaginationSort {
    public column: string;
    public sortType: SortType;

    public constructor(init?:Partial<PaginationSort>) {
        Object.assign(this, init);
    }
}

import { AppService } from "./../../../schema/app/app.service";
import { PaginationRQ } from "./../../../schema/common/dto/pagination-rq.dto";
import { AdSearchForm } from "./ad-search-form.dto";
import { NearBy } from "./near-by.dto";

export class AdSearch {
  
  constructor(private readonly appService: AppService) {    
  }
    public keyword: string = '';
    public nearBy: NearBy;
    public paginationRQ: PaginationRQ = new PaginationRQ();
    public adSearchForm: AdSearchForm = new AdSearchForm();
    public defaultLanguageId: number = null; // = this.appService.configuration().language.id;
  }
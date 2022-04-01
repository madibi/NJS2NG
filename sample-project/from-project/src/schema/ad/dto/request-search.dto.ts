import { AppService } from "./../../../schema/app/app.service";
import { PaginationRQ } from "./../../../schema/common/dto/pagination-rq.dto";
import { RequestSearchForm } from "./request-search-form.dto";

export class RequestSearch {
  
  constructor(private readonly appService: AppService) {    
  }

    public keyword: string = '';
    public paginationRQ: PaginationRQ = new PaginationRQ();
    public requestSearchForm: RequestSearchForm = new RequestSearchForm();
    public defaultLanguageId: number = null; // = this.appService.configuration().language.id;
  }
import { Expose } from "class-transformer";

export class Request {
  @Expose()  
  public id: string = '';
  @Expose()
  public date: Date = null;
  @Expose()
  public folderId: string = '';   
  @Expose()
  public requestStatusId: string = '';     

    public constructor(init?:Partial<Request>) {
      Object.assign(this, init);
    }  
  }
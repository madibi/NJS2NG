
export class UpdateRequestNoteRQ {
    public id: string = '';
    public requestId: string = '';
    public content: string = '';
    public date: string = '';
    public isNew: boolean = false;
    public isEdit: boolean = false;
    public isDelete: boolean = false;

    public constructor(init?:Partial<UpdateRequestNoteRQ>) {
      Object.assign(this, init);
    }
  }
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ImageInfo } from "./../../../schema/common/dto/image-info.dto";

export class UserPublic {
  @Expose()
  public id: string;
  @Expose()
  public firstName: string;
  @Expose()
  public lastName: string;
  @Expose()
  public genderId: string;
  @Expose()
  public title: string;
  @Expose()
  public bio: string;  

  public constructor(init?:Partial<UserPublic>) {
    Object.assign(this, init);
  }
}
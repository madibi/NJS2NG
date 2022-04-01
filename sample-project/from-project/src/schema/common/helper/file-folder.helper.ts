require('dotenv').config()

export class FileFolder {
  static readonly COMMON = new FileFolder('COMMON', `${process.env.SERVER_FILE_BASE_URL}common`);
  static readonly USER_AVATAR = new FileFolder('AVATAR', `${process.env.SERVER_FILE_BASE_URL}user/avatar`);
  static readonly USER_WALLPAPER = new FileFolder('WALLPAPER', `${process.env.SERVER_FILE_BASE_URL}user/wallpaper`);
  static readonly USER_ATTACHMENT = new FileFolder('ATTACHMENT', `${process.env.SERVER_FILE_BASE_URL}user/attachment`);
  static readonly COMPANY_LOGO = new FileFolder('LOGO', `${process.env.SERVER_FILE_BASE_URL}company/logo`);
  static readonly COMPANY_WALLPAPER = new FileFolder('LOGO', `${process.env.SERVER_FILE_BASE_URL}company/wallpaper`);
  

  // private to disallow creating other instances of this type
  private constructor(
    private readonly key: string, public readonly value: any
    ) {
  }

  toString(): string {
    return this.key;
  }
}
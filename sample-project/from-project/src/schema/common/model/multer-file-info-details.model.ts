import { Expose } from "class-transformer";
import { MulterFileInfo } from "./multer-file-info.model";

export class MulterFileInfoDetails extends MulterFileInfo {
    width: number = null;
    height: number = null; 
    averageColor: string = null;
    extension: string = null;
    mimeType: string = null;
}

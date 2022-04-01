import { MulterFileInfo } from './multer-file-info.model';

export interface MulterFileInfoDetails extends MulterFileInfo {    width: number;    height: number;     averageColor: string;    extension: string;    mimeType: string;}
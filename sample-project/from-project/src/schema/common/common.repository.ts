import { Repository, EntityRepository } from 'typeorm';
import { Sms } from '../common/entity/sms.entity';
import { Image } from '../common/entity/image.entity';
import { File } from '../common/entity/file.entity';

@EntityRepository(Sms)
export class CommonSmsRepository extends Repository<Sms> {
}

@EntityRepository(Image)
export class CommonImageRepository extends Repository<Image> {
}

@EntityRepository(File)
export class CommonFileRepository extends Repository<File> {
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Timestamp,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { Folder } from './../../user/entity/folder.entity';
import { File } from '../../common/entity/file.entity';
import { Ad } from './ad.entity';
import { User } from './../../../schema/user/entity/user.entity';
import { RequestStatus } from './../../../schema/enum/entity/request-status.entity';

@Unique(["employeeId", "adId"])
@Entity({ schema: 'AD', name: 'Request' })
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { eager: false })
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  @Column({ unique: false, type: 'uuid', nullable: false })
  employeeId: string;

  @ManyToOne(() => Ad, (ad) => ad.id, { eager: false })
  @JoinColumn({ name: 'adId', referencedColumnName: 'id' })
  @Column({ unique: false, type: 'uuid', nullable: false })
  adId: string;

  @ManyToOne(() => Folder, (folder) => folder.id, { eager: false })
  @JoinColumn({ name: 'folderId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  folderId: string;

  @ManyToOne(() => RequestStatus, (requestStatus) => requestStatus.id, { eager: false })
  @JoinColumn({ name: 'requestStatusId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: false })
  requestStatusId: string;

  @Column({ type: 'boolean', nullable: true })
  isMyFavorite: boolean;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @OneToOne(() =>File)
  @JoinColumn({ name: 'fileId', referencedColumnName: 'id' })
  fileId: string;

  @BeforeInsert()
  async setDate() {
      this.date = new Date();
      this.requestStatusId = '1' // NOT_SEEN_YET
  }  
}

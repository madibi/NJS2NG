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
} from 'typeorm';
import { Language } from './language.entity';
import { RequestStatus } from './request-status.entity';


// TODO: requestStatusId + languageId must be unique
// TODO: also for other localizes

@Entity({ schema: 'ENUM', name: 'RequestStatusLocalize' })
export class RequestStatusLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;  
  
  @ManyToOne(() => RequestStatus, requestStatus => requestStatus.id, { eager: false })
  @JoinColumn({ name: 'requestStatusId', referencedColumnName: 'id' })
  requestStatusId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string; 
}

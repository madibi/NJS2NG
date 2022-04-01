import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from './request.entity';

@Entity({ schema: 'AD', name: 'RequestNote' })
export class RequestNote extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: string;

  @ManyToOne(() => Request, request => request.id, { eager: false })
  @JoinColumn({ name: 'requestId', referencedColumnName: 'id' })
  requestId: string;   

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'date', nullable: false })
  date: string;
}

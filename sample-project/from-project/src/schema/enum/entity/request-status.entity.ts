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

@Entity({ schema: 'ENUM', name: 'RequestStatus' })
export class RequestStatus extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;  
  
  @Column({ type: 'varchar', nullable: true })
  nameKW: string;
}

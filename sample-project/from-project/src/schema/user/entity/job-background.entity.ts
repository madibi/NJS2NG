import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Image } from '../../common/entity/image.entity';

@Entity({schema: 'USER', name: 'JobBackground'})
export class JobBackground extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;   

  @Column({ nullable: true })
  title: string;   

  @Column({ nullable: true })
  companyName: string;   

  @Column({ type: 'date', nullable: true })
  dateStart: Date;   

  @Column({ type: 'date', nullable: true })
  dateEnd: Date;   

  @Column({ nullable: true })
  explain: string;   

  @Column({ nullable: true })
  priority: number;   
}

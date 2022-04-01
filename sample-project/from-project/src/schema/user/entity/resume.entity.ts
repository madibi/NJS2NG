import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { File } from '../../common/entity/file.entity';

@Entity({schema: 'USER', name: 'Resume'})
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;   

  @OneToOne(() => File)
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  imageId: string;   
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { File } from '../../common/entity/file.entity';

@Entity({schema: 'USER', name: 'UserAttachment'})
export class UserAttachment extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @Column()
  userId: string;   

  @OneToOne(() => File, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'fileId', referencedColumnName: 'id' })
  @Column()
  fileId: string;   
}

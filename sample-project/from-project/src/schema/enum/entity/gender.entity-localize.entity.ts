import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Gender } from './gender.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'GenderLocalize'})
export class GenderLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Gender, gender => gender.id, { eager: false })
  @JoinColumn({ name: 'genderId', referencedColumnName: 'id' })
  genderId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;  

  @Column()
  name: string;  
}
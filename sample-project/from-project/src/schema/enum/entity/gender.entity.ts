import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { GenderLocalize } from './gender.entity-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'Gender'})
export class Gender extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>GenderLocalize, genderLocalize => 
  genderLocalize.genderId)
  id: number; 

  @Column()
  nameKW: string;  
}
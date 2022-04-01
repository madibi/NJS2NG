import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DegreeCategoryLocalize } from './degree-category-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'DegreeCategory'})
export class DegreeCategory extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>DegreeCategoryLocalize, degreeCategoryLocalize => 
  degreeCategoryLocalize.degreeCategoryId)  
  id: number; 

  @Column()
  nameKW: string; 
}
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ExperienceCategoryLocalize } from './experience-category-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'ExperienceCategory'})
export class ExperienceCategory extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>ExperienceCategoryLocalize, experienceCategoryLocalize => 
  experienceCategoryLocalize.experienceCategoryId)  
  id: number; 

  @Column()
  nameKW: string; 
}
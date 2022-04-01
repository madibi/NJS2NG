import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ExperienceCategory } from './experience-category.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'ExperienceCategoryLocalize'})
export class ExperienceCategoryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => ExperienceCategory, exprienceCategory => exprienceCategory.id, { eager: false })
  @JoinColumn({ name: 'experienceCategoryId', referencedColumnName: 'id' })
  experienceCategoryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;  

  @Column()
  name: string; 
}
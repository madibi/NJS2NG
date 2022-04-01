import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobCategoryLocalize } from './job-category-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'JobCategory'})
export class JobCategory extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>JobCategoryLocalize, jobCategoryLocalize => 
  jobCategoryLocalize.jobCategoryId)
  id: number; 

  @Column()
  nameKW: string;  
}
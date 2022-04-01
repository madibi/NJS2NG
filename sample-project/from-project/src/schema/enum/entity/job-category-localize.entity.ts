import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { JobCategory } from './job-category.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'JobCategoryLocalize'})
export class JobCategoryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => JobCategory, jobCategory => jobCategory.id, { eager: false })
  @JoinColumn({ name: 'jobCategoryId', referencedColumnName: 'id' })
  jobCategoryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;  
}
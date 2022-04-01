import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Language } from './language.entity';
import { MilitaryConditionCategoryLocalize } from './military-condition-category-localize.entity';
import { MinimumSalaryLocalize } from './minimum-salary-localize.entity';

@Entity({ schema: 'ENUM', name: 'MinimumSalary'})
export class MinimumSalary extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>MinimumSalaryLocalize, minimumSalaryLocalize => 
  minimumSalaryLocalize.minimumSalaryId)
  id: number; 

  @Column()
  nameKW: string;  
}
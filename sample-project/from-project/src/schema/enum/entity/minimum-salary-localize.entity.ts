import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Language } from './language.entity';
import { MilitaryConditionCategory } from './military-condition-category.entity';
import { MinimumSalary } from './minimum-salary.entity';

@Entity({ schema: 'ENUM', name: 'MinimumSalaryLocalize'})
export class MinimumSalaryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => MinimumSalary, minimumSalary => minimumSalary.id, { eager: false })
  @JoinColumn({ name: 'minimumSalaryId', referencedColumnName: 'id' })
  minimumSalaryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;  

  @Column()
  name: string;    
}
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Language } from './language.entity';
import { MilitaryConditionCategoryLocalize } from './military-condition-category-localize.entity';

@Entity({ schema: 'ENUM', name: 'MilitaryConditionCategory'})
export class MilitaryConditionCategory extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>MilitaryConditionCategoryLocalize, militaryConditionCategoryLocalize => 
  militaryConditionCategoryLocalize.militaryConditionCategoryId)
  id: number; 

  @Column()
  nameKW: string;  
}
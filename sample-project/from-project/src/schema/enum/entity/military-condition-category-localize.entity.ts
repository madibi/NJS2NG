import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Language } from './language.entity';
import { MilitaryConditionCategory } from './military-condition-category.entity';

@Entity({ schema: 'ENUM', name: 'MilitaryConditionCategoryLocalize'})
export class MilitaryConditionCategoryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => MilitaryConditionCategory, militaryConditionCategory => militaryConditionCategory.id, { eager: false })
  @JoinColumn({ name: 'militaryConditionCategoryId', referencedColumnName: 'id' })
  militaryConditionCategoryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;  

  @Column()
  name: string;    
}
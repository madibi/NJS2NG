import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyPersonnelLocalize } from './company-personnel-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'CompanyPersonnel'})
export class CompanyPersonnel extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>CompanyPersonnelLocalize, companyPersonnelLocalize => 
  companyPersonnelLocalize.companyPersonnelId)  
  id: number; 

  @Column()
  levelKW: string; 
}
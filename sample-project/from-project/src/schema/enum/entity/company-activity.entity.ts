import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyActivityLocalize } from './company-activity-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'CompanyActivity'})
export class CompanyActivity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  // @OneToMany(() =>CompanyActivityLocalize, companyActivityLocalize => 
  // companyActivityLocalize.companyActivityId)
  id: number; 

  @Column()
  nameKW: string;     
}
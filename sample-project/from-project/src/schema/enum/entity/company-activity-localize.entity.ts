import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { CompanyActivity } from './company-activity.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'CompanyActivityLocalize'})
export class CompanyActivityLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => CompanyActivity, companyActivity => companyActivity.id, { eager: false })
  @JoinColumn({ name: 'companyActivityId', referencedColumnName: 'id' })
  companyActivityId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
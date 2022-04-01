import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { CompanyPersonnel } from './company-personnel.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'CompanyPersonnelLocalize'})
export class CompanyPersonnelLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => CompanyPersonnel, companyPersonnel => companyPersonnel.id, { eager: false })
  @JoinColumn({ name: 'companyPersonnelId', referencedColumnName: 'id' })
  companyPersonnelId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  level: string;  
}
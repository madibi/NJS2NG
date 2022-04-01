
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; 
import { User } from './user.entity';
import { CompanyPersonnel } from './../../../schema/enum/entity/company-personnel.entity';
import { Country } from './../../../schema/enum/entity/country.entity';
import { Province } from './../../../schema/enum/entity/province.entity';
import { City } from './../../../schema/enum/entity/city.entity';
import { CompanyActivity } from './../../../schema/enum/entity/company-activity.entity';

@Entity({ schema: 'USER', name: 'Company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @Column()
  userId: string;   

  @Column({ unique: false, nullable: false })
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ unique: true, nullable: true })
  emailAddress: string;

  @Column({ unique: true, nullable: true })
  websiteAddress: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'float', nullable: true })
  lat?: number;

  @Column({ type: 'float', nullable: true })
  lon?: number;

  @ManyToOne(() => Country, (country) => country.id, { eager: false })
  @JoinColumn({ name: 'countryId', referencedColumnName: 'id' })
  @Column()
  countryId?: number;

  @ManyToOne(() => Province, (province) => province.id, { eager: false })
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
  @Column()
  provinceId?: number;

  @ManyToOne(() => City, (city) => city.id, { eager: false })
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  @Column()
  cityId?: number;

  @ManyToOne(() => CompanyPersonnel, (companyPersonnel) => companyPersonnel.id, { eager: false })
  @JoinColumn({ name: 'companyPersonnelId', referencedColumnName: 'id' })
  @Column({ nullable: true })
  companyPersonnelId?: number;   

  @Column({ nullable: true })
  explain?: string;

  @Column({ nullable: true })
  isCompanyApproved?: boolean;

  @ManyToMany(() => CompanyActivity, (companyActivity) => companyActivity.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  companyActivities?: CompanyActivity[];

  @BeforeInsert()
  async setFalse() {
    this.isCompanyApproved = true;
  }
}

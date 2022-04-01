import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { JobCategory } from './../../enum/entity/job-category.entity';
import { ContractType } from './../../enum/entity/contract-type.entity';
import { Country } from './../../enum/entity/country.entity';
import { Province } from './../../enum/entity/province.entity';
import { City } from './../../enum/entity/city.entity';
import { ExperienceCategory } from './../../enum/entity/experience-category.entity';
import { DegreeCategory } from './../../enum/entity/degree-category.entity';
import { Gender } from './../../enum/entity/gender.entity';
import { MilitaryConditionCategory } from './../../enum/entity/military-condition-category.entity';
import { AdCondition } from './../../enum/entity/ad-condition.entity';
import { MinimumSalary } from './../../enum/entity/minimum-salary.entity';
import { User } from './../../../schema/user/entity/user.entity';
import { Expose } from 'class-transformer';

@Entity({ schema: 'AD', name: 'Ad' })
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  @ManyToOne(() => User, (user) => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  jobTitle: string;

  @ManyToOne(() => AdCondition, (adCondition) => adCondition.id, {
    eager: true,
  })
  @JoinColumn({ name: 'adConditionId', referencedColumnName: 'id' })
  @Column()
  adConditionId: number;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.id, {
    eager: false,
  })
  @JoinColumn({ name: 'jobCategoryId', referencedColumnName: 'id' })
  @Column()
  jobCategoryId: number;

  @ManyToOne(() => ContractType, (contractType) => contractType.id, {
    eager: false,
  })
  @JoinColumn({ name: 'contractTypeId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  contractTypeId: number;

  @ManyToOne(() => Country, (country) => country.id, { eager: false })
  @JoinColumn({ name: 'countryId', referencedColumnName: 'id' })
  @Column()
  countryId: number;

  @ManyToOne(() => Province, (province) => province.id, { eager: false })
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
  @Column()
  provinceId: number;

  @ManyToOne(() => City, (city) => city.id, { eager: false })
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  @Column()
  cityId: number;

  @ManyToOne(
    () => ExperienceCategory,
    (experienceCategory) => experienceCategory.id,
    { eager: false },
  )
  @JoinColumn({ name: 'experienceCategoryId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  experienceCategoryId: number;

  @ManyToOne(() => DegreeCategory, (degreeCategory) => degreeCategory.id, {
    eager: false,
  })
  @JoinColumn({ name: 'degreeCategoryId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  degreeCategoryId: number;

  @ManyToOne(() => Gender, (gender) => gender.id, { eager: false })
  @JoinColumn({ name: 'genderId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  genderId: number;
  
  @ManyToOne(
    () => MilitaryConditionCategory,
    (militaryConditionCategory) => militaryConditionCategory.id,
    { eager: false },
  )
  @JoinColumn({
    name: 'militaryConditionCategoryId',
    referencedColumnName: 'id',
  })
  @Column({ type: 'bigint', nullable: true })
  militaryConditionCategoryId: number;

  @ManyToOne(() => MinimumSalary, (minimumSalary) => minimumSalary.id, {
    eager: false,
  })
  @JoinColumn({ name: 'minimumSalaryId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  minimumSalaryId: number;
  @Column({ type: 'varchar', nullable: true })
  explain: string;

  @Column({ type: 'boolean', nullable: true })
  isApproved: boolean;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @BeforeInsert()
  async setDate() {
      this.date = new Date();
  }  
}

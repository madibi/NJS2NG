import { Language } from './language.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { EducationGrade } from './education-grade.entity';

@Entity({ schema: 'ENUM', name: 'EducationGradeLocalize'})
export class EducationGradeLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => EducationGrade, educationGrade => educationGrade.id, { eager: false })
  @JoinColumn({ name: 'educationGradeId', referencedColumnName: 'id' })
  educationGradeId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Image } from '../../common/entity/image.entity';
import { EducationGrade } from './../../../schema/enum/entity/education-grade.entity';

@Entity({schema: 'USER', name: 'EducationBackground'})
export class EducationBackground extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;   

  @Column({ nullable: true })
  fieldOfStudy: string;  

  @Column({ nullable: true })
  instituteName: string;  
  
  @ManyToOne(() => EducationGrade, (educationGrade) => educationGrade.id, { eager: false })
  @JoinColumn({ name: 'educationGradeId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  educationGradeId: string;  

  @Column({ type: 'date', nullable: true })
  dateStart: Date;   

  @Column({ type: 'date', nullable: true })
  dateEnd: Date; 

  @Column({ nullable: true })
  explain: string;   

  @Column({ nullable: true })
  priority: number;   
}

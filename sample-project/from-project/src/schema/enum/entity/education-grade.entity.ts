import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'ENUM', name: 'EducationGrade'})
export class EducationGrade extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column({ nullable: true })
  nameKW: string; 
}
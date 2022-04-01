import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ schema: 'APP', name: 'EmployerMainPageWhyUs'})
export class EmployerMainPageWhyUs extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column()
  text: string; 

  @Column({ type: 'bool', nullable: true })
  status: boolean = false; 
}
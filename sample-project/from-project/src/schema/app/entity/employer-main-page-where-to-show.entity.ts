import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ schema: 'APP', name: 'EmployerMainPageWhereToShow'})
export class EmployerMainPageWhereToShow extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column()
  text: string; 

  @Column({ type: 'bool', nullable: true })
  status: boolean = false;   
}
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity } from 'typeorm';

@Entity({ schema: 'ENUM', name: 'Role'})
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({unique: true, nullable: false})
  key: string; 

  @Column()
  name: string; 
}
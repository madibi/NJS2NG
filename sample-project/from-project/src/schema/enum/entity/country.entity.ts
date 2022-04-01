import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, OneToMany } from 'typeorm';
import { Province } from './province.entity';

@Entity({ schema: 'ENUM', name: 'Country'})
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column({ unique: true, nullable: true })
  nameKW: string;  
}
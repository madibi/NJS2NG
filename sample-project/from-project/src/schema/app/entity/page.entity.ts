import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { PageLocalize } from './page-localize.entity';

@Entity({ schema: 'APP', name: 'Page'})
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column()
  nameKW: string;    
}
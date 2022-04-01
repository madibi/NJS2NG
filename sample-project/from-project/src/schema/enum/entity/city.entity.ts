import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Province } from './province.entity';

@Entity({ schema: 'ENUM', name: 'City'})
export class City extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Province, province => province.id, { eager: false })
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
  provinceId: number; 

  @Column({ nullable: true })
  nameKW: string; 
}
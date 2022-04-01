import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity({ schema: 'ENUM', name: 'Province'})
export class Province extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Country, country => country.id, { eager: false })
  @JoinColumn({ name: 'countryId', referencedColumnName: 'id' })
  countryId: number;    

  @Column({ nullable: true })
  nameKW: string;   
}
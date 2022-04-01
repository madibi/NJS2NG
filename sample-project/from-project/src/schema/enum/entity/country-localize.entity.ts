import { Language } from './../../enum/entity/language.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Country } from './country.entity';

@Entity({ schema: 'ENUM', name: 'CountryLocalize'})
export class CountryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Country, country => country.id, { eager: false })
  @JoinColumn({ name: 'countryId', referencedColumnName: 'id' })
  countryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
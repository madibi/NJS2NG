import { Language } from './language.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { City } from './city.entity';

@Entity({ schema: 'ENUM', name: 'CityLocalize'})
export class CityLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => City, city => city.id, { eager: false })
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  cityId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
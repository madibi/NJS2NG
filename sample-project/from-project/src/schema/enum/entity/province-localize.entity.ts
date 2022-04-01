import { Language } from './../../enum/entity/language.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Province } from './province.entity';

@Entity({ schema: 'ENUM', name: 'ProvinceLocalize'})
export class ProvinceLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Province, province => province.id, { eager: false })
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
  provinceId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
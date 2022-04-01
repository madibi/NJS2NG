import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { DegreeCategory } from './degree-category.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'DegreeCategoryLocalize'})
export class DegreeCategoryLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => DegreeCategory, degreeCategory => degreeCategory.id, { eager: false })
  @JoinColumn({ name: 'degreeCategoryId', referencedColumnName: 'id' })
  degreeCategoryId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;  

  @Column()
  name: string; 
}
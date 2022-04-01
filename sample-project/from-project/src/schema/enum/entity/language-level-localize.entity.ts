import { Language } from './language.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { LanguageLevel } from './language-level.entity';

@Entity({ schema: 'ENUM', name: 'LanguageLevelLocalize'})
export class LanguageLevelLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => LanguageLevel, languageLevel => languageLevel.id, { eager: false })
  @JoinColumn({ name: 'languageLevelId', referencedColumnName: 'id' })
  languageLevelId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
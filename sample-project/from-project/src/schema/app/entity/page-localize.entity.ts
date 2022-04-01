import { Language } from './../../../schema/enum/entity/language.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Page } from './page.entity';

@Entity({ schema: 'APP', name: 'PageLocalize'})
export class PageLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => Page, page => page.id, { eager: false })
  @JoinColumn({ name: 'pageId', referencedColumnName: 'id' })
  pageId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
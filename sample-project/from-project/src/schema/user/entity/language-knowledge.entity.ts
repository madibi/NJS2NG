import { LanguageLevel } from '../../enum/entity/language-level.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity({schema: 'USER', name: 'LanguageKnowledge'})
export class LanguageKnowledge extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() =>User, user => user.id, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;   

  @Column({ nullable: true })
  name: string;   

  @ManyToOne(() => LanguageLevel, (languageLevel) => languageLevel.id, { eager: false })
  @JoinColumn({ name: 'languageLevelId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  languageLevelId: string; 
}

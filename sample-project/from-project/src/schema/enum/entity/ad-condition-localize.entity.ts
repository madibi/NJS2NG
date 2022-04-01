import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { AdCondition } from './ad-condition.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'AdConditionLocalize'})
export class AdConditionLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => AdCondition, adCondition => adCondition.id, { eager: false })
  @JoinColumn({ name: 'adConditionId', referencedColumnName: 'id' })
  adConditionId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
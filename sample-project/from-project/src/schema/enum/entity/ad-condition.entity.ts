import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AdConditionLocalize } from './ad-condition-localize.entity';

@Entity({ schema: 'ENUM', name: 'AdCondition'})
export class AdCondition extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() => AdConditionLocalize, adConditionLocalize => 
  adConditionLocalize.adConditionId)
  id: number; 

  @Column()
  nameKW: string;     
}
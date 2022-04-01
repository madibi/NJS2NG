import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ContractTypeLocalize } from './contract-type-localize.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'ContractType'})
export class ContractType extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  @OneToMany(() =>ContractTypeLocalize, contractTypeLocalize => 
  contractTypeLocalize.contractTypeId)
  id: number; 

  @Column()
  nameKW: string;    
}
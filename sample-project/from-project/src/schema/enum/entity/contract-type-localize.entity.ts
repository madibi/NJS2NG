import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ContractType } from './contract-type.entity';
import { Language } from './language.entity';

@Entity({ schema: 'ENUM', name: 'ContractTypeLocalize'})
export class ContractTypeLocalize extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @ManyToOne(() => ContractType, contractType => contractType.id, { eager: false })
  @JoinColumn({ name: 'contractTypeId', referencedColumnName: 'id' })
  contractTypeId: number;

  @ManyToOne(() => Language, language => language.id, { eager: false })
  @JoinColumn({ name: 'languageId', referencedColumnName: 'id' })
  languageId: number;

  @Column()
  name: string;   
}
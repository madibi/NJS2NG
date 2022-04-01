import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'ENUM', name: 'Language'})
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column()
  name: string; 

  @Column()
  code: string; 

  @Column()
  direction: string; 

  @Column({nullable: true})
  date: string;   

  // https://stackoverflow.com/a/37682352
  public constructor(init?:Partial<Language>) {
    super();
    Object.assign(this, init);
  }
}
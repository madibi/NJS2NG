import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';

@Entity({ schema: 'COMMON', name: 'Sms' })
export class Sms extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({ nullable: true })
  mobileCountryCode: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  date: Date;

  @BeforeInsert()
  async generateDate() {
    this.date = new Date();
  }
}

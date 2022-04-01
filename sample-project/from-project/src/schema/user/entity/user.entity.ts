import { Role } from './../../enum/entity/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  Unique,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; 
import * as bcrypt from 'bcrypt';
import { UserAvatar } from './user-avatar.entity';
import { Gender } from './../../../schema/enum/entity/gender.entity';

@Unique(["mobileCountryCode", "mobileNumber"])
@Check(`SUBSTR("mobileCountryCode",1,2) = '00'`)
@Check(`LENGTH("mobileCountryCode") = 4`)
@Entity({ schema: 'USER', name: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false, nullable: true })
  mobileCountryCode: string;

  @Column({ unique: false, nullable: true })
  mobileNumber: string;

  @Column({ unique: true, nullable: true })
  emailAddress: string;

  @Column({ unique: true, nullable: true })
  userName: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  title?: string;

  @ManyToOne(() => Gender, (gender) => gender.id, { eager: false })
  @JoinColumn({ name: 'genderId', referencedColumnName: 'id' })
  @Column({ type: 'bigint', nullable: true })
  genderId: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  skills?: string; // comma separated

  @Column({ nullable: true })
  isMobileNumberVerified?: boolean;

  @Column({ nullable: true })
  isEmailAddressVerified?: boolean;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  aboutMe?: string;

  @ManyToMany(() => Role, (role) => role.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    if(this.password) {
      this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_OR_ROUNDS));
    } else {
      this.password = null;
    }
  }
}

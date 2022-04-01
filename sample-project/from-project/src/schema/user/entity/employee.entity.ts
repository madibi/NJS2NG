import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ schema: 'USER', name: 'Employee' })
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number; 

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    userId: string;       
}
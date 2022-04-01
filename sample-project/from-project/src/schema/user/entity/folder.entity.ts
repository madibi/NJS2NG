import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Unique(["userId", "name"])
@Entity({ schema: 'USER', name: 'Folder' })
export class Folder extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number; 

    @ManyToOne(() =>User, user => user.id, { eager: false })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    userId: string;    
    
    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'int', nullable: true })
    priority: number;
}
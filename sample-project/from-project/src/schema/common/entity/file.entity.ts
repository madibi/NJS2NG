import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'COMMON', name: 'File'})
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ unique: true, nullable: true })
  path: string;

  @Column({ nullable: true })
  size: number; // byte

  @Column({ nullable: true })
  extension?: string;  

  @Column({ nullable: true })
  mimeType?: string;  
}
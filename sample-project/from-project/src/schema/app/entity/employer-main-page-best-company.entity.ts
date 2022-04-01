import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Image } from '../../common/entity/image.entity';

@Entity({ schema: 'APP', name: 'EmployerMainPageBestCompany'})
export class EmployerMainPageBestCompany extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number; 

  @Column()
  name: string; 

  @Column({ type: 'uuid', nullable: false })
  imageId: string;    

  @Column({ type: 'bool', nullable: true })
  status: boolean = false;   

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;  
}
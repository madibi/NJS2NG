import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Image } from '../../common/entity/image.entity';
import { Company } from './company.entity';

@Entity({schema: 'USER', name: 'CompanyWallpaper'})
export class CompanyWallpaper extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne(() => Company, company => company.id, { eager: false })
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  @Column()
  companyId: string;   

  @OneToOne(() => Image, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  @Column()
  imageId: string;   
}

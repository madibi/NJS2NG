import { Country } from "./../../enum/entity/country.entity";
import { Province } from "./../../enum/entity/province.entity";
import { City } from "./../../enum/entity/city.entity";
import { CompanyActivity } from "../../enum/entity/company-activity.entity";
import { CompanyPersonnel } from "./../../enum/entity/company-personnel.entity";
import { User } from "./user.entity";
import { Image } from '../../common/entity/image.entity';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'USER', name: 'Employer' })
export class Employer extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    userId: string; 

    @Column({ type: 'varchar', nullable: true })
    companyName: string; 

    @ManyToOne(() => Country, country => country.id, { eager: false })
    @JoinColumn({ name: 'countryId', referencedColumnName: 'id' })
    countryId: number; 

    @ManyToOne(() => Province, province => province.id, { eager: false })
    @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
    provinceId: number; 

    @ManyToOne(() => City, city => city.id, { eager: false })
    @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
    cityId: number;    

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string;     

    @Column({ type: 'varchar', nullable: true })
    websiteAddress: string;  
    
    @Column({ type: 'text', nullable: true })
    explain: string;  

    @OneToOne(() =>Image)
    @JoinColumn({ name: 'logoImageId', referencedColumnName: 'id' })
    logoImageId: number; 

    @OneToOne(() =>Image)
    @JoinColumn({ name: 'wallpaperImageId', referencedColumnName: 'id' })
    wallpaperImageId: number; 

    @ManyToOne(() => CompanyPersonnel, companyPersonnel =>companyPersonnel.id, { eager: false })
    @JoinColumn({ name: 'companyPersonnelId', referencedColumnName: 'id' })
    companyPersonnelId: number;  

    @ManyToOne(() => CompanyActivity, companyActivity =>companyActivity.id, { eager: false })
    @JoinColumn({ name: 'companyActivityId', referencedColumnName: 'id' })
    companyActivityId: number;             
}
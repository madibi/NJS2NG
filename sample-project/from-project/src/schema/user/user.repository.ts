import { Repository, EntityRepository, getManager } from 'typeorm';
import { UserAvatar } from './entity/user-avatar.entity';
import { Employee } from './entity/employee.entity';
import { Employer } from './entity/employer.entity';
import { User } from './entity/user.entity';
import { Length } from 'class-validator';
import { UserWallpaper } from './entity/user-wallpaper.entity';
import { CompanyLogo } from './entity/company-logo.entity';
import { CompanyWallpaper } from './entity/company-wallpaper.entity';
import { Company } from './entity/company.entity';
import { CompanyActivity } from './../../schema/enum/entity/company-activity.entity';
import { UserPublic } from './dto/user-public.dto';
import { UserInfo } from './dto/user-info.dto';
import { CompanyInfo } from './dto/company-info.dto';
import { CompanyPublic } from './dto/company-public.dto';
import { UserAttachment } from './entity/user-attachment.entity';
import { Folder } from './entity/folder.entity';

@EntityRepository(User)
export class UserUserRepository extends Repository<User> {
    async userRelated(userId: string): Promise<UserInfo<UserPublic, null>> {
        let info = await getManager().query(`
	    SELECT 
			avatar."id" as "avatarId", 
			wallpaper."id" as "wallpaperId", 
			image."width", image."height", image."averageColor", image."path", image."path" 
		FROM "COMMON"."Image" as image
		LEFT JOIN "USER"."UserAvatar" as avatar
		ON image."id" = avatar."imageId"	
		LEFT JOIN "USER"."UserWallpaper" as wallpaper
		ON image."id" = wallpaper."imageId"
		WHERE 
		(avatar."userId" IS NULL OR
		avatar."userId" = $1)
		AND 
		(wallpaper."userId" IS NULL OR
		wallpaper."userId" = $1)

        `,[userId]);
        const avatar = info.find( i => i.avatarId != null);
        const wallpaper = info.find(i => i.wallpaperId != null);
        return new UserInfo<UserPublic, null>({
            avatar: {
                width: avatar ? avatar.width : null,
                height: avatar ? avatar.height : null,
                averageColor: avatar ? avatar.averageColor : null,
                path: avatar ? avatar.path : null,
                extension: avatar ? avatar.extension : null,
                mimeType: avatar ? avatar.mimeType : null,
            },
            wallpaper: {
                width: wallpaper ? wallpaper.width : null,
                height: wallpaper ? wallpaper.height : null,
                averageColor: wallpaper ? wallpaper.averageColor : null,
                path: wallpaper ? wallpaper.path : null,
                extension: wallpaper ? wallpaper.extension : null,
                mimeType: wallpaper ? wallpaper.mimeType : null,                
            },            
        });
    }
}

@EntityRepository(UserAvatar)
export class UserUserAvatarRepository extends Repository<UserAvatar> {
}

@EntityRepository(UserWallpaper)
export class UserUserWallpaperRepository extends Repository<UserWallpaper> {
}

@EntityRepository(UserAttachment)
export class UserUserAttachmentRepository extends Repository<UserAttachment> {
}

@EntityRepository(Company)
export class UserCompanyRepository extends Repository<Company> {
    async companyRelated(companyId: string): Promise<CompanyInfo<CompanyPublic>> {
        let info = await getManager().query(`
	    SELECT 
			logo."id" as "logoId", 
			wallpaper."id" as "wallpaperId", 
			image."width", image."height", image."averageColor", image."path", image."path" 
		FROM "COMMON"."Image" as image
		LEFT JOIN "USER"."CompanyLogo" as logo
		ON image."id" = logo."imageId"	
		LEFT JOIN "USER"."CompanyWallpaper" as wallpaper
		ON image."id" = wallpaper."imageId"
		WHERE 
		(logo."companyId" IS NULL OR
		logo."companyId" = $1)
		AND 
		(wallpaper."companyId" IS NULL OR
		wallpaper."companyId" = $1)

        `,[companyId]);
        const logo = info.find( i => i.logo != null);
        const wallpaper = info.find(i => i.wallpaperId != null);
        return new CompanyInfo<CompanyPublic>({
            logo: {
                width: logo ? logo.width : null,
                height: logo ? logo.height : null,
                averageColor: logo ? logo.averageColor : null,
                path: logo ? logo.path : null,
                extension: logo ? logo.extension : null,
                mimeType: logo ? logo.mimeType : null,                
            },
            wallpaper: {
                width: wallpaper ? wallpaper.width : null,
                height: wallpaper ? wallpaper.height : null,
                averageColor: wallpaper ? wallpaper.averageColor : null,
                path: wallpaper ? wallpaper.path : null,
                extension: wallpaper ? wallpaper.extension : null,
                mimeType: wallpaper ? wallpaper.mimeType : null,  
            },            
        });
    }    
}

@EntityRepository(CompanyLogo)
export class UserCompanyLogoRepository extends Repository<CompanyLogo> {
}

@EntityRepository(CompanyWallpaper)
export class UserCompanyWallpaperRepository extends Repository<CompanyWallpaper> {
}

@EntityRepository(Employer)
export class UserEmployerRepository extends Repository<Employer> {
}

@EntityRepository(Employee)
export class UserEmployeeRepository extends Repository<Employee> {
}

@EntityRepository(Folder)
export class UserFolderRepository extends Repository<Folder> {
}


import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckOut } from './../../schema/common/model/check-out';
import { CheckOutObject } from './../../schema/common/model/check-out-object.model';
import { PaginationRQ } from './../../schema/common/dto/pagination-rq.dto';
import { AccessTokenPayload } from './../../schema/user/model/access-token-payload.model';
import { AdAdRepository, AdFavoriteRepository, AdRequestNoteRepository, AdRequestRepository } from './ad.repository';
import { Ad } from './entity/ad.entity';
import * as Entity_Request from './entity/request.entity';
import * as Dto_Request from './dto/request.dto';
import { paginate, Pagination, IPaginationOptions, } from 'nestjs-typeorm-paginate';
import { PaginationRS } from './../../schema/common/dto/pagination-rs.dto';
import { plainToClass } from 'class-transformer';
import { UserPublic } from './../../schema/user/dto/user-public.dto';
import { RequestType } from './../../schema/common/enum/request-type.enum';
import { Role } from './../../schema/user/enum/role.enum';
import { UserAvatar } from '../user/entity/user-avatar.entity';
import { Image } from './../common/entity/image.entity';
import { ImageInfo } from './../../schema/common/dto/image-info.dto';
import { AdSearchForm } from './dto/ad-search-form.dto';
import { AdSearch } from './dto/ad-search.dto';
import { PaginationSort } from './../common/dto/pagination-sort.dto';
import { SortType } from './../../schema/common/enum/sort-type.enum';
import { Favorite } from './entity/favorite.entity';
import { PaginationDetails } from './../../schema/common/dto/pagination-details.dto';
import { IsNull } from 'typeorm';
import { User } from './../../schema/user/entity/user.entity';
import { Employer } from './../../schema/user/entity/employer.entity';
import { RequestSearch } from './dto/request-search.dto';
import { RequestInfo } from './dto/request-info.dto';
import { Request } from './entity/request.entity';
import { Company } from './../user/entity/company.entity';
import { CompanyLogo } from './../../schema/user/entity/company-logo.entity';
import { CompanyPrivate } from './../../schema/user/dto/company-private.dto';
import { CompanyPublic } from './../../schema/user/dto/company-public.dto';
import { AdPublic } from './dto/ad-public.dto';
import { ImageProcessorService } from '../../services/image-processor.service';
import { request } from 'http';
import { differenceInDays } from 'date-fns';
import { UserSemiPrivate } from './../../schema/user/dto/user-semi-private.dto';
import { UserAttachment } from './../../schema/user/entity/user-attachment.entity';
import * as Entity_Image from './../../schema/common/entity/image.entity';
import * as Entity_File from './../../schema/common/entity/file.entity';
import { UpdateRequestNoteRQ } from './dto/update-request-note-rq.dto';
import { RequestNote } from './entity/request-note.entity';
import { map } from 'rxjs/operators';
import { Folder } from './../../schema/user/entity/folder.entity';
import { SetRequestFolder } from './dto/set-request-folder.dto';

@Injectable()
export class AdService {

    constructor(
        @InjectRepository(AdAdRepository)
        private adAdRepository: AdAdRepository,
        @InjectRepository(AdRequestRepository)
        private adRequestRepository: AdRequestRepository,
        @InjectRepository(AdRequestNoteRepository)
        private adRequestNoteRepository: AdRequestNoteRepository,   
        @InjectRepository(AdFavoriteRepository)
        private adFavoriteRepository: AdFavoriteRepository,          
        private imageProcessorService: ImageProcessorService
    ) {}    

    async readAds(
        requestType: RequestType, 
        tokenInfo: AccessTokenPayload,         
        adSearch: AdSearch
        ): Promise<CheckOutObject<PaginationRS<AdPublic[]>>> {
        const checkOutObject = new CheckOutObject<PaginationRS<AdPublic[]>>(); 
        let query = this.adAdRepository.createQueryBuilder('ad');
        if (tokenInfo) { 
            // query.leftJoinAndSelect(Request, "request", `request.adId = ad.id AND request."employeeId" = '${tokenInfo.userId}'`);
            query.leftJoinAndMapOne(
                'ad._request',
                Request,
                'request',
                `request.adId = ad.id AND request."employeeId" = '${tokenInfo.userId}'`,
            );
        }        
        query.leftJoinAndMapOne(
            'ad._company',
            Company,
            'company',
            'company."userId" = ad."userId"',
        )   
        query.leftJoinAndSelect(CompanyLogo, "companyLogo", '"companyLogo"."companyId" = company.id');           
        query.leftJoinAndMapOne(
            'ad._companyLogo',
            Entity_Image.Image,
            'companyLogoImage',
            '"companyLogoImage".id = "companyLogo"."imageId"',
        )   
                      
        if (tokenInfo) {
            query.leftJoinAndMapOne(
                'ad._favorite',
                Favorite,
                'favorite',
                `(ad.id = favorite."adId" AND favorite."employeeId" = '${tokenInfo.userId}')`,            
            )  
        }

        if(requestType == RequestType.ALL) {
            query.where('ad."isApproved" = true');   
            query.andWhere('ad."adConditionId" = :adConditionId', { adConditionId: 3 }) // published      
            if (tokenInfo) {
                query.andWhere('ad."userId" != :userId', { userId: tokenInfo.userId }) 
            }                              
        } else if (requestType == RequestType.ADMIN && tokenInfo.hasRole(Role.ADMIN)) {
            query.where('ad."id" NOTNULL'); // always true condition, we need 'where for later andWhere'
        } else if (requestType == RequestType.OWNER && tokenInfo.hasRole(Role.EMPLOYER)) {
            query.where('ad."userId" = :userId', { userId: tokenInfo.userId });
        } else {
            checkOutObject.status = false;
            checkOutObject.message = "not acceptable request";
            checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;   
            return checkOutObject;
        }

        if (adSearch.keyword) {
            query.andWhere('ad."jobTitle" like :keyword', { keyword: `%${adSearch.keyword}%`});
        }

        if (adSearch.adSearchForm?.provinceId) {
            query.andWhere('ad."provinceId" = :provinceId', { provinceId: adSearch.adSearchForm.provinceId});
        }    
        
        if (adSearch.adSearchForm?.cityId) {
            query.andWhere('ad."cityId" = :cityId', { cityId: adSearch.adSearchForm.cityId});
        }            

        if (adSearch.adSearchForm?.jobCategoryId) {
            query.andWhere('ad."jobCategoryId" = :jobCategoryId', { jobCategoryId: adSearch.adSearchForm.jobCategoryId});
        }  
        
        if (adSearch.adSearchForm?.jobContractTypeIds) {
            query.andWhere('ad."contractTypeId" IN (:...jobContractTypeIds)', 
            { jobContractTypeIds: adSearch.adSearchForm.jobContractTypeIds })
        }  

        if (adSearch.adSearchForm?.requiredGenderIds) {
            query.andWhere('ad."genderId" IN (:...requiredGenderIds)', 
            { requiredGenderIds: adSearch.adSearchForm.requiredGenderIds })
        }    
        
        if (tokenInfo) {
            if (adSearch.adSearchForm?.justMyRequests) { 
                query.andWhere('request."employeeId" IS NOT NULL');
            } else {
                query.andWhere('request."employeeId" ISNULL');
            }
        }         
        
        if (adSearch.adSearchForm?.justFavAds) {
            if (tokenInfo) {
                query.andWhere('favorite  IS NOT NULL');
            } else {
                checkOutObject.status = false;
                checkOutObject.message = "need to login";
                checkOutObject.httpStatus = HttpStatus.UNAUTHORIZED;               
            }            
        }   
        
        if (adSearch.nearBy?.status && adSearch.nearBy?.value > 0) {
            query.andWhere('ST_DWithin(ST_MakePoint("company"."lon","company"."lat")::geography,ST_MakePoint(:currentLon,:currentLat)::geography,:distanceInMeter)', {
                currentLat: 35.81614277584664,
                currentLon: 51.63353758183939,
                distanceInMeter: (1000 * adSearch.nearBy.value)
            });
        }           

        if (adSearch.paginationRQ.sort && adSearch.paginationRQ.sort.length > 0) {
            let sort = adSearch.paginationRQ.sort[0];
            let sortType: 'ASC'|'DESC' = sort.sortType === 0 ? 'ASC' : 'DESC';
            query.orderBy(`ad.${sort.column}`, sortType);
        } else {
            query.orderBy('ad.date', 'ASC');
        }

        // console.log(query.getSql());

        const res = await paginate<Ad>(query, {
            page: adSearch.paginationRQ.currentPage,
            limit: adSearch.paginationRQ.pageSize
        }) as any; 

        const adPublics: AdPublic[] = [];
        res.items.map((ad) => {  
            const companyLogo = this.imageProcessorService.getImageProperties(ad._companyLogo);    
            const companyPublic = ad._company ? plainToClass(CompanyPublic, ad._company, {
            excludeExtraneousValues: true,
            }) : null;   

            const request = ad._request ? ad._request : null;
            const favorite = ad._favorite ? ad._favorite : null;

            delete ad._company;
            delete ad._companyLogo;
            delete ad._favorite;

            const adPublic = new AdPublic({
                ad,
                companyPublic,
                companyLogo,
                request,
                favorite
            });
            adPublics.push(adPublic)
        });

        checkOutObject.object = new PaginationRS<AdPublic[]>({
            paginationDetails: new PaginationDetails({
                totalPages: res.meta.totalPages,
                totalItems: res.meta.totalItems,
                currentPage: adSearch.paginationRQ.currentPage,
            }),
            items: adPublics,
        })
        return checkOutObject;
    }

    async readAd(id: string): Promise<Ad> {
        return await this.adAdRepository
            .createQueryBuilder('ad')
            .where('ad."id" = :id', { id })
            .getOne()
    } 
    
    async updateAd(adId: string, ad: Ad): Promise<CheckOutObject<Ad>> {
        let checkOutObject = new CheckOutObject<Ad>();
        if (adId === ad.id) {

            await this.adAdRepository.update(
                { id: adId},
                ad,
            );              
            checkOutObject.object = ad;
          } else {
            checkOutObject.status = false;
          }
          return checkOutObject;
    }     

    async submitAd(tokenInfo: AccessTokenPayload, id: string, ad: Ad): Promise<CheckOutObject<Ad>> {
        let checkOutObject = new CheckOutObject<Ad>();

        if(id === '00000000-0000-0000-0000-000000000000') {
            delete ad.id;
            ad.userId = tokenInfo.userId;

            const entity = Object.assign(new Ad(), ad);
            checkOutObject.object = await this.adAdRepository.save(entity);
            return checkOutObject;
        } else {
            const storedAd  = await this.adAdRepository.findOne({
                id
            });
            if (storedAd.userId !== tokenInfo.userId || storedAd.userId !== ad.userId) {
                checkOutObject.message = 'not your ad';
                checkOutObject.status = false;
                return checkOutObject;
            } else {
                delete ad.id;
                
                await this.adAdRepository.update({ id }, ad);
                checkOutObject.object = ad;
                return checkOutObject;
            }
        }        
    }    

    async updateFavorite(tokenInfo: AccessTokenPayload, adId: string, status: boolean): Promise<CheckOutObject<AdPublic>> {
        const checkOutObject = new CheckOutObject<AdPublic>();

        const oldFav = await this.adFavoriteRepository
        .createQueryBuilder('favorite')
        .where('favorite."employeeId" = :employeeId', { employeeId: tokenInfo.userId })
        .andWhere('favorite."adId" = :adId', { adId })
        .getOne()

        if (status && oldFav) {
            //
        } else if (status && !oldFav) {
            const favorite = {
                employeeId: tokenInfo.userId,
                adId
                } as Favorite;

            const entity = Object.assign(new Favorite(), favorite);
            await this.adFavoriteRepository.save(entity);
        } else if (!status && !oldFav) {
            checkOutObject.object = null;
        } else if(!status && oldFav) {
            await this.adFavoriteRepository.remove(oldFav);
        } else {
            checkOutObject.status = false;
            checkOutObject.message = "not implement condition",
            checkOutObject.httpStatus = HttpStatus.NOT_IMPLEMENTED
        }

        const res = await this.adAdRepository
        .createQueryBuilder('ad')
        .leftJoinAndMapOne(
            'ad._favorite',
            Favorite,
            'favorite',
            `(ad.id = favorite."adId" AND favorite."employeeId" = '${tokenInfo.userId}')`,            
        )         
        .where('ad."id" = :id', { id: adId })        
        .getOne() as any;

        const favorite = res._favorite ? res._favorite : null;
        delete res._favorite;
        const ad = res;

        const adPublic = new AdPublic({
            ad,
            favorite
        });

        checkOutObject.object = adPublic;
        return checkOutObject;
    }      

    async updateRequest(tokenInfo: AccessTokenPayload, adId: string): Promise<CheckOutObject<Entity_Request.Request>> {
        const checkOutObject = new CheckOutObject<Entity_Request.Request>();

        let isRequestSubmitted = await this.adRequestRepository.createQueryBuilder('request')
                .where('request."employeeId" = :employeeId', { employeeId: tokenInfo.userId })
                .andWhere('request."adId" = :adId', { adId })
                .getOne();                

        if (isRequestSubmitted) {
            checkOutObject.status = false;
            checkOutObject.message = 'request submitted before';
            checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;                
        } else {
            const request = {
                employeeId: tokenInfo.userId,
                adId,
                requestStatusId: '1' // NOT_SEEN_YET
                } as Entity_Request.Request;
    
                const entity = Object.assign(new Entity_Request.Request(), request);
                checkOutObject.object = await this.adRequestRepository.save(entity);
        }

        return checkOutObject;
    }   
    
    async readRequests(
        requestType: RequestType,
        tokenInfo: AccessTokenPayload, 
        requestSearch: RequestSearch
        ): Promise<CheckOutObject<PaginationRS<RequestInfo[]>>> {
        const checkOutObject = new CheckOutObject<PaginationRS<RequestInfo[]>>(); 
        const requestInfos: RequestInfo[] = [];

        let query = this.adRequestRepository.createQueryBuilder('request');

        if (requestType == RequestType.ADMIN) {
            // nothing to filter
        } else if (requestType == RequestType.OWNER) {

            // get ads info
            let adQuery = this.adAdRepository.createQueryBuilder('ad');
            adQuery.where('ad."userId" = :userId', { userId: tokenInfo.userId });
            if (requestSearch.keyword) {
                adQuery.andWhere('ad."jobTitle" like :keyword', { keyword: `%${requestSearch.keyword}%`});
            }
            if (requestSearch.requestSearchForm?.adId) {
                adQuery.andWhere('ad."id" = :adId', { adId: requestSearch.requestSearchForm.adId});
            }
            // if (requestSearch.requestSearchForm?.folderId) {
            //     adQuery.leftJoinAndMapMany(
            //         'ad._userFolders',
            //         Folder,
            //         'userFolder',
            //         `"userFolder"."userId" = '${tokenInfo.userId}'`,            
            //       ); 
            //     adQuery.andWhere('"userFolder"."id" = :folderId', { folderId: requestSearch.requestSearchForm.folderId });
            // }            
            // console.log(adQuery.getSql());
            const ads = await adQuery.getMany();
            let adIds = ads.map(r => r.id);
            if (adIds.length == 0) { adIds = [null]};
            // console.log(adIds);

            // get request info
            query.leftJoinAndMapOne("request._user", "request.employeeId", "user");
            query.leftJoinAndSelect(UserAvatar, "avatar", "avatar.userId = user.id")                                              
            query.leftJoinAndMapOne(
                'request._avatar',
                Image,
                'image',
                '(image.id = avatar."imageId")',
            )   
            query.andWhere('request."adId" IN(:...adIds)', { adIds });

            if (requestSearch.requestSearchForm?.folderId) {
                query.andWhere('request."folderId" = :folderId', { folderId: requestSearch.requestSearchForm.folderId });  
            }  

            if (requestSearch.requestSearchForm?.justMyFavorites) {
                query.andWhere('request."isMyFavorite" = true');          
            }  

            if (requestSearch.requestSearchForm?.justTodayRequests) {
                const today = new Date(); //new Date().getTime();
                query.andWhere('request."date" = :today', {today});          
            }              

            if (requestSearch.requestSearchForm?.requiredGenderIds) {
                query.andWhere('user."genderId" IN (:...requiredGenderIds)', 
                { requiredGenderIds: requestSearch.requestSearchForm.requiredGenderIds })
            }                 

        } else {
            checkOutObject.status = false;
            checkOutObject.message = "not acceptable request";
            checkOutObject.httpStatus = HttpStatus.NOT_ACCEPTABLE;   
            return checkOutObject;
        }

        // console.log(query.getSql());

        let res = await paginate<Entity_Request.Request>(query, {
            page: requestSearch.paginationRQ.currentPage,
            limit: requestSearch.paginationRQ.pageSize
        }) as any;       

        const today = new Date();
        res.items.map((req) => {
            const requestInfo = new RequestInfo();
            requestInfo.userInfo.user = plainToClass(UserSemiPrivate, req._user, { excludeExtraneousValues: true });
            requestInfo.userInfo.avatar = this.imageProcessorService.getImageProperties(req._avatar);
            requestInfo.request = plainToClass(Dto_Request.Request, req, { excludeExtraneousValues: true });  
            requestInfo.differenceInDays = differenceInDays(today, new Date(requestInfo.request.date));
            requestInfos.push(requestInfo);        
        });
        checkOutObject.object = new PaginationRS<RequestInfo[]>({
            paginationDetails: new PaginationDetails({
                totalPages: res.meta.totalPages,
                totalItems: res.meta.totalItems,
                currentPage: requestSearch.paginationRQ.currentPage,
            }),
            items: requestInfos,
        })
        return checkOutObject;
    }   
    
    async readRequest(tokenInfo: AccessTokenPayload, requestId: string): Promise<CheckOutObject<RequestInfo>> {
        const checkOutObject = new CheckOutObject<RequestInfo>(); 

        let query = this.adRequestRepository.createQueryBuilder('request');
        query.leftJoinAndMapOne("request._ad", "request.adId", "ad");
        query.leftJoinAndMapOne("request._user", "request.employeeId", "user");
        query.leftJoinAndSelect(UserAvatar, "avatar", "avatar.userId = user.id");
        query.leftJoinAndSelect(UserAttachment, "userAttachment", "avatar.userId = user.id");                                           
        query.leftJoinAndMapOne(
            'request._avatar',
            Image,
            'image',
            '(image.id = avatar."imageId")',
        ); 
        query.leftJoinAndMapOne(
            'request._attachment',
            Entity_File.File,
            'userAttachmentFile',
            'userAttachmentFile.id = "userAttachment"."fileId"',            
          );   
          query.leftJoinAndMapMany(
            'request._note',
            RequestNote,
            'requestNote',
            '"requestNote"."requestId" = "request".id',            
          );                       
        query.where('ad."userId" = :userId', { userId: tokenInfo.userId });
        query.andWhere('request."id" = :requestId', { requestId });
        query.orderBy('"requestNote".id', 'ASC');

        // console.log(query.getSql());
        const req = await query.getOne() as any;

        if(!req) {
            checkOutObject.status = false;
            checkOutObject.message = "not fount request";
            checkOutObject.httpStatus = HttpStatus.NOT_FOUND;   
            return checkOutObject;
        } else {
            const requestInfo = new RequestInfo();
            let notes = [];
            req._note.map((r) => {
                const updateRequestNoteRQ = new UpdateRequestNoteRQ();
                const requestExtend =  {
                    ...updateRequestNoteRQ,
                    ...r
                };
                notes.push(requestExtend);
            });
            requestInfo.request = plainToClass(Dto_Request.Request, req, { excludeExtraneousValues: true }); 
            requestInfo.differenceInDays = differenceInDays(new Date(), new Date(requestInfo.request.date));
            requestInfo.notes = notes;
            requestInfo.userInfo.user = plainToClass(UserSemiPrivate, req._user, { excludeExtraneousValues: true });             
            requestInfo.userInfo.avatar = this.imageProcessorService.getImageProperties(req._avatar);
            requestInfo.userInfo.attachment =this.imageProcessorService.getImageProperties(req._attachment);
            checkOutObject.object = requestInfo;  
        }
    
        return checkOutObject;
    }      
    
    async setRequestStatus(tokenInfo: AccessTokenPayload, requestId: string, requestStatusId: string): Promise<CheckOut> {
        const checkOut = new CheckOut(); 

        let query = this.adRequestRepository.createQueryBuilder('request');
        query.leftJoinAndSelect(Ad, "ad", 'ad.id = request."adId"')  
        query.where('request."id" = :requestId', { requestId });
        query.andWhere('ad."userId" = :userId', { userId: tokenInfo.userId });

        const req = await query.getOne() as Request;

        if(!req) {
            checkOut.status = false;
            checkOut.message = "not fount request";
            checkOut.httpStatus = HttpStatus.NOT_FOUND;   
            return checkOut;
        } else {
            req.requestStatusId = requestStatusId;

            await this.adRequestRepository.save(req);
        }
    
        return checkOut;
    }  

    async setRequestFolder(tokenInfo: AccessTokenPayload, requestId: string, employerFolderId: string): Promise<CheckOutObject<SetRequestFolder>> {
        const checkOutObject = new CheckOutObject<SetRequestFolder>(); 

        let query = this.adRequestRepository.createQueryBuilder('request');
        query.leftJoinAndSelect(Ad, "ad", 'ad.id = request."adId"')  
        query.where('request."id" = :requestId', { requestId });
        query.andWhere('ad."userId" = :userId', { userId: tokenInfo.userId });

        const req = await query.getOne() as Request;

        if(!req) {
            checkOutObject.status = false;
            checkOutObject.message = "not fount request";
            checkOutObject.httpStatus = HttpStatus.NOT_FOUND;   
        } else {
            req.folderId = employerFolderId;
            const resUpdate = await this.adRequestRepository.save(req);
            const setRequestFolder = new SetRequestFolder();
            setRequestFolder.folderId = resUpdate.folderId;
            checkOutObject.object = setRequestFolder;
        }
    
        return checkOutObject;
    }      
    
    async updateRequestNotes(tokenInfo: AccessTokenPayload, requestId: string, updateRequestNoteRQ: UpdateRequestNoteRQ): Promise<CheckOutObject<UpdateRequestNoteRQ>> {
        const checkOutObject = new CheckOutObject<UpdateRequestNoteRQ>(); 

        if (updateRequestNoteRQ.id == null && updateRequestNoteRQ.isNew) {
            delete updateRequestNoteRQ.id;
            updateRequestNoteRQ.requestId = requestId; 
            const newRec  = await this.adRequestNoteRepository.createQueryBuilder('requestNote')
            .insert()
            .into(RequestNote)
            .values(updateRequestNoteRQ)
            .returning("*")
            .execute();
            updateRequestNoteRQ.id = newRec.generatedMaps[0].id;
            updateRequestNoteRQ.isNew = false;
            checkOutObject.object = updateRequestNoteRQ;
        } else {
            let query = this.adRequestRepository.createQueryBuilder('request');
            query.leftJoinAndSelect(Ad, "ad", 'ad.id = request."adId"')
            query.leftJoinAndSelect(RequestNote, "requestNote", '"requestNote"."requestId" = request."id"')  
            query.where('request."id" = :requestId', { requestId });
            query.andWhere('ad."userId" = :userId', { userId: tokenInfo.userId });
            query.andWhere('"requestNote"."id" = :id', { id: updateRequestNoteRQ.id });

            // console.log(query.getSql());
            const req = await query.getOne();
            if(!req) {
                checkOutObject.status = false;
                checkOutObject.message = "not fount request";
                checkOutObject.httpStatus = HttpStatus.NOT_FOUND;   
                return checkOutObject;
            } else {
                if (updateRequestNoteRQ.id != null && updateRequestNoteRQ.isEdit) {
                    let instance = JSON.parse(JSON.stringify(updateRequestNoteRQ));                    
                    delete instance.isNew;
                    delete instance.isEdit;
                    delete instance.isDelete;
                    delete instance.id;
                    delete instance.requestId;
                    const updateRec = await this.adRequestNoteRepository.createQueryBuilder('requestNote')
                    .update(RequestNote)
                    .set(instance)
                    .where("id = :id", { id: updateRequestNoteRQ.id })
                    .andWhere('"requestId" = :requestId', { requestId })
                    .execute();  
                    // .getSql();
                    // console.log(updateRec);
                    updateRequestNoteRQ.isEdit = false;                         
                    checkOutObject.object = updateRequestNoteRQ;    
                } else if (updateRequestNoteRQ.id != null && updateRequestNoteRQ.isDelete) {
                    let delRec = await this.adRequestNoteRepository.createQueryBuilder('requestNote')
                    .delete()
                    .from(RequestNote)
                    .where("id = :id", { id: updateRequestNoteRQ.id })
                    .execute();
                    checkOutObject.object = null;
                }
            }
        }    
        return checkOutObject;
    }
}

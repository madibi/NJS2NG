import { Body, Controller, Get, Post, Query, HttpException, HttpStatus, DefaultValuePipe, ParseIntPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Roles } from './../../decorators/roles.decorator';
import { Role } from './../user/enum/role.enum';
import { AccessTokenPayload } from './../../schema/user/model/access-token-payload.model';
import { AdService } from './ad.service';
import { Ad } from './entity/ad.entity';
import { Request } from './entity/request.entity';
import { TokenInfo } from './../../decorators/access-token.decorator';
import { PaginationRQ } from '../common/dto/pagination-rq.dto';
import { PaginationRS } from './../../schema/common/dto/pagination-rs.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CheckOut } from './../../schema/common/model/check-out';
import { RequestType } from './../../schema/common/enum/request-type.enum';
import { AdSearchForm } from './dto/ad-search-form.dto';
import { PaginationPageSize } from './../../schema/common/enum/pagination-page-size.enum';
import { AdSearch } from './dto/ad-search.dto';
import { Favorite } from './entity/favorite.entity';
import { ToggleFavoriteRQ } from './dto/toggle-favorite-rq.dto';
import { RequestSearch } from './dto/request-search.dto';
import { RequestInfo } from './dto/request-info.dto';
import { AdPublic } from './dto/ad-public.dto';
import * as Entity_Request from './entity/request.entity';
import { CheckOutObject } from './../common/model/check-out-object.model';
import { SetRequestStatusRQ } from './dto/set-request-status-rq.dto';
import { UpdateRequestNoteRQ } from './dto/update-request-note-rq.dto';
import { SetRequestFolder } from './dto/set-request-folder.dto';

@Controller('ad')
@ApiTags('ad')
@ApiBearerAuth()
export class AdController {

    constructor(private readonly adService: AdService) {}    
  
    @ApiExcludeEndpoint()  
    @Post('ads')
    async readAds(            
      @TokenInfo() tokenInfo: AccessTokenPayload,        
      @Body() adSearch: AdSearch
    ): Promise<PaginationRS<AdPublic[]>> {      
      // if (!keyword) {keyword = ''};
      // if (!paginationRQ) {paginationRQ = new PaginationRQ()};
      // if (!adSearchForm) {adSearchForm = new AdSearchForm()};
      // if (!paginationRQ.currentPage) { paginationRQ.currentPage = 1 };
      // if (!paginationRQ.pageSize) { paginationRQ.pageSize = PaginationPageSize.TEN };
      
      const res = await this.adService.readAds( 
        RequestType.ALL, 
        tokenInfo, 
        adSearch
        );

        if (res.status) {
          return res.object;
        } else {
          throw new HttpException(res.message, res.httpStatus);
        }
    } 

    @ApiExcludeEndpoint()  
    @Roles(Role.ADMIN)   
    @Post('ads/admin')
    async readAdsAdmin(    
      @TokenInfo() tokenInfo: AccessTokenPayload,        
      @Body() adSearch: AdSearch
    ): Promise<PaginationRS<AdPublic[]>> {

      const res = await this.adService.readAds( 
        RequestType.ADMIN, 
        tokenInfo, 
        adSearch
        );

        if (res.status) {
          return res.object;
        } else {
          throw new HttpException(res.message, res.httpStatus);
        }        
    }     

    @ApiExcludeEndpoint()  
    @Roles(Role.EMPLOYER)    
    @Post('ads/owner')
    async readAdsOwner(
      @TokenInfo() tokenInfo: AccessTokenPayload,        
      @Body() adSearch: AdSearch
    ): Promise<PaginationRS<AdPublic[]>> {
      const res = await this.adService.readAds( 
        RequestType.OWNER, 
        tokenInfo, 
        adSearch
        );

        if (res.status) {
          return res.object;
        } else {
          throw new HttpException(res.message, res.httpStatus);
        }        
    } 
   
    @ApiExcludeEndpoint()  
    @Get('ads/:id')
    async readAd(   
      @Param('id') id: string,
    ): Promise<Ad> {
      return await this.adService.readAd(id);
    }    
    
    @ApiExcludeEndpoint()  
    @Roles(Role.ADMIN)  
    @Post('ads/:id')
    async updateAd(
      @Param('id') id: string,
      @Body() ad: Ad,
    ): Promise<Ad> {
      let checkOutObject = new CheckOutObject<Ad>();
      checkOutObject = await this.adService.updateAd(id, ad);
      if (!checkOutObject.status) {
        throw new HttpException(checkOutObject.message, HttpStatus.NOT_ACCEPTABLE);
      } else {
        return checkOutObject.object;     
      }
    }    
    
    @ApiExcludeEndpoint()  
    @Roles(Role.EMPLOYER)
    @Post('ads/:id/submit')
    async submitAd(
      @TokenInfo() tokenInfo: AccessTokenPayload,
      @Param('id') id: string,
      @Body() ad: Ad
      ): Promise<Ad> {
      const res = await this.adService.submitAd(tokenInfo, id, ad);
      if (!res.status) {
        throw new HttpException(res.message, HttpStatus.UNAUTHORIZED);
      } else {
        return res.object;
      }
    } 

    @ApiExcludeEndpoint()  
    @Roles(Role.EMPLOYEE)  
    @Post('ads/:id/Favorite')
    async toggleFavorite(            
      @TokenInfo() tokenInfo: AccessTokenPayload,  
      @Param('id') id: string,       
      @Body() toggleFavoriteRQ: ToggleFavoriteRQ
    ): Promise<AdPublic> {                  
      const res = await this.adService.updateFavorite( 
        tokenInfo, 
        id,
        toggleFavoriteRQ.status
        );

        if (res.status) {
          return res.object;
        } else {
          throw new HttpException(res.message, res.httpStatus);
        }
    }    
    
    @ApiExcludeEndpoint()  
    @Roles(Role.EMPLOYEE, Role.EMPLOYER)     
    @Post('ads/:id/request')
    async updateRequest(
      @TokenInfo() tokenInfo: AccessTokenPayload,      
      @Param('id') id: string,    
    ): Promise<CheckOutObject<Entity_Request.Request>> {
      const res = await this.adService.updateRequest(tokenInfo, id);
      return res;
    } 
    
    // @Roles(Role.ADMIN)    
    // @Get('requests')
    // async readRequests(
    //   @TokenInfo() tokenInfo: AccessTokenPayload,    
    //   @Query('currentPage', new DefaultValuePipe(1), ParseIntPipe) currentPage: number = 1,
    //   @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number = 10,           
    // ): Promise<Pagination<Request>> {
    //   pageSize = pageSize > 100 ? 100 : pageSize;
    //   return this.adService.readRequests(RequestType.ADMIN, null, {
    //     page: currentPage,
    //     limit: pageSize,
    //     route: 'http://localhost/ad/ads',
    //   });
    // } 
    
    @ApiExcludeEndpoint()  
    @Roles(Role.EMPLOYER)    
    @Post('requests/owner')
    async readRequestsOwner(
      @TokenInfo() tokenInfo: AccessTokenPayload,   
      @Body() requestSearch: RequestSearch          
    ): Promise<PaginationRS<RequestInfo[]>> {      
      const res = await this.adService.readRequests(
        RequestType.OWNER, 
        tokenInfo, 
        requestSearch
        );

        if (res.status) {
          return res.object;
        } else {
          throw new HttpException(res.message, res.httpStatus);
        }        
    }    
    
    @ApiExcludeEndpoint()
    @Roles(Role.EMPLOYER)    
    @Get('requests/:requestId')
    async readRequest(
      @TokenInfo() tokenInfo: AccessTokenPayload,   
      @Param('requestId') requestId: string            
    ): Promise<RequestInfo> {
      const res = await this.adService.readRequest(tokenInfo, requestId);

      if (res.status) {
        return res.object;
      } else {
        throw new HttpException(res.message, res.httpStatus);
      } 
    } 
      
    @Roles(Role.EMPLOYER)    
    @Post('requests/:requestId/status')
    async updateRequestStatus(
      @TokenInfo() tokenInfo: AccessTokenPayload,   
      @Param('requestId') requestId: string,
      @Body() setRequestStatusRQ: SetRequestStatusRQ
    ): Promise<CheckOut> {
      const res = await this.adService.setRequestStatus(tokenInfo, requestId, setRequestStatusRQ.requestStatusId);

      if (res.status) {
        return res;
      } else {
        throw new HttpException(res.message, res.httpStatus);
      } 
    } 
      
    @Roles(Role.EMPLOYER)    
    @Post('requests/:requestId/folder')
    async setRequestFolder(
      @TokenInfo() tokenInfo: AccessTokenPayload,   
      @Param('requestId') requestId: string,
      @Body() setRequestFolder: SetRequestFolder
    ): Promise<SetRequestFolder> {
      const res = await this.adService.setRequestFolder(tokenInfo, requestId, setRequestFolder.folderId);
      if (res.status) {
        return res.object;
      } else {
        throw new HttpException(res.message, res.httpStatus);
      } 
    }     
    
    @Roles(Role.EMPLOYER)    
    @Post('requests/:requestId/notes/:noteId')
    async updateRequestNotes(
      @TokenInfo() tokenInfo: AccessTokenPayload,   
      @Param('requestId') requestId: string,
      @Body() updateRequestNoteRQ: UpdateRequestNoteRQ
    ): Promise<UpdateRequestNoteRQ> {
      const res = await this.adService.updateRequestNotes(tokenInfo, requestId, updateRequestNoteRQ);

      if (res.status) {
        return res.object;
      } else {
        throw new HttpException(res.message, res.httpStatus);
      } 
    } 
}

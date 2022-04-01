import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnumService } from './enum.service';
import { Enum } from './dto/enum.dto';
import { EnumLanguage } from './dto/enum-language.dto';
import { LanguageName } from './dto/language-name.dto';

@Controller('enum')
@ApiTags('enum')
export class EnumController {

    constructor(private readonly enumService: EnumService) {}    

    @Get('all') 
    keyword(): Promise<Enum> {
      return this.enumService.keyword();
    }

    @Get('all/:languageId') 
    enums(@Param('languageId') languageId: number): Promise<EnumLanguage> {
      return this.enumService.enumLangs(languageId);
    }

    @Get('provinces') 
    provinces(
      @Query('countryId', ParseIntPipe) countryId: number = 1,
      @Query('languageId', ParseIntPipe) languageId: number = 1
      ): Promise<LanguageName[]> {
      return this.enumService.getProvinces(countryId, languageId);
    }

    @Get('cities') 
    cities(
      @Query('provinceId') countryId: number,
      @Query('languageId') languageId: number
      ): Promise<LanguageName[]> {
      return this.enumService.getCities(countryId, languageId);
    }
}

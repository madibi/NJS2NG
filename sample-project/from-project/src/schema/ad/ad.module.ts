import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdController } from './ad.controller';
import { AdAdRepository, AdFavoriteRepository, AdRequestNoteRepository, AdRequestRepository } from './ad.repository';
import { AdService } from './ad.service';
import { CommonModule } from './../../schema/common/common.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([
      AdAdRepository,
      AdRequestRepository,
      AdRequestNoteRepository,
      AdFavoriteRepository,      
    ]),
    CommonModule
  ],
  controllers: [AdController],
  providers: [AdService]
})
export class AdModule {}

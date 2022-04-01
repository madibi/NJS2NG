import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionOptions } from 'typeorm';
import AppConfig from './../../config/app.config';
import {
  AppEmployerMainPageBestComponyRepository,
  AppEmployerMainPageWhereToShowRepository,
  AppEmployerMainPageWhyUsRepository,
  AppPageLocalizeRepository,
  AppPageRepository,
} from './app.repository';
import { UserModule } from './../user/user.module';
import { EnumModule } from './../enum/enum.module';
import { AdModule } from './../ad/ad.module';
import { RolesGuard } from './../../guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenMiddleware } from './../../middleware/access-token.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import path from 'path';
import { LoggerConfig } from './../../config/logger.config';
import { LoggerMiddleware } from './../../middleware/logger.middleware';

const loggerConfig: LoggerConfig = new LoggerConfig();
winston.addColors(loggerConfig.colors());
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    // WinstonModule.forRoot({
    //   transports: [
    //     // new winston.transports.Console(),
    //     new winston.transports.Console({
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         winston.format.ms(),
    //         nestWinstonModuleUtilities.format.nestLike('EliteAPP', { prettyPrint: true }),
    //       ),
    //     }), 
    //     new winston.transports.File({
    //       dirname: './log/debug/',
    //       filename: 'debug.log', 
    //       level: 'debug',
    //     }),
    //     new winston.transports.File({
    //       dirname: './log/info/',
    //       filename: 'info.log',
    //       level: 'info',
    //     }),               
    //   ],
    // }),
    WinstonModule.forRoot(loggerConfig.init()),    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log(configService.get<ConnectionOptions>('database'));
        return configService.get<ConnectionOptions>('database');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      AppPageRepository,
      AppPageLocalizeRepository,
      AppEmployerMainPageBestComponyRepository,
      AppEmployerMainPageWhereToShowRepository,
      AppEmployerMainPageWhyUsRepository,
    ]),
    UserModule,
    EnumModule,
    AdModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

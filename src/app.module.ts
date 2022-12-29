import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';
const dbConfig = require('../ormconfig.js')

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal:true,
        // Ensure NODE_ENV is set
        envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(dbConfig),
    // ----- For using env variables
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       // Connect the entity to the root connection
    //       entities: [User, Report]
    //     };
    //   }
    // }),
    // ---- For using only one kind of DB
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),
   UsersModule,
   ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService ) {}

  configure(consumer: MiddlewareConsumer) {
    // Middleware to be applied with a cookieSession
    // whenever we start out applicataion or the AppModule is called
    consumer
      .apply(
        cookieSession({
            keys: [this.configService.get('COOKIE_KEY')]
        })
     )
    .forRoutes('*');
  }
}

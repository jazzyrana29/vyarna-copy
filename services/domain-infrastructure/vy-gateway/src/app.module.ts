import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

import { AppLoggerMiddleware } from './middlewares/app.log.middleware';

import { AppController } from './app.controller';
import { ContactModule } from './modules/contact/contact.module';
import { ActiveCampaignService } from './services/static/active-campaign/active-campaign.service';
import { WebsocketGateway } from './gateway/websocket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: '8h' },
    //   global: true,
    // }),

    //Caching Module
    // CacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: Number(process.env.REDIS_PORT),
    //   ttl: 600,
    //   isGlobal: true,
    // }),
    // //Throttle requests
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 5,
    //     limit: 60,
    //   },
    // ]),

    ContactModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    WebsocketGateway,
    AppService,
    ActiveCampaignService,
  ],
})
export class AppModule implements NestModule {
  constructor() {
    console.warn(`${AppModule.name} initialized`);
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

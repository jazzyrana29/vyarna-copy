import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from './utils/common';

import { SentryInterceptor } from './interceptors/sentry.interceptor';

import * as redisStore from 'cache-manager-ioredis';

import { AppService } from './app.service';

import { AppLoggerMiddleware } from './middlewares/app.log.middleware';

import { AppController } from './app.controller';

import { EducationFeedModule } from './modules/domain-emotional-and-engagement/vy-education-feed/vy-education-feed.module';
import { EmotionalEngagementModule } from './modules/domain-emotional-and-engagement/vy-emotional-engagement/vy-emotional-engagement.module';
import { FinancePaymentsModule } from './modules/domain-finance/vy-finance-payments/vy-finance-payments.module';
import { FinanceWalletModule } from './modules/domain-finance/vy-finance-wallet/vy-finance-wallet.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { HealthCryAnalyzerModule } from './modules/domain-health-and-insights/vy-health-cry-analyzer/vy-health-cry-analyzer.module';
import { HealthGrowthTrackerModule } from './modules/domain-health-and-insights/vy-health-growth-tracker/vy-health-growth-tracker.module';
import { HealthLogModule } from './modules/domain-health-and-insights/vy-health-log/vy-health-log.module';
import { HealthSleepModule } from './modules/domain-health-and-insights/vy-health-sleep/vy-health-sleep.module';
import { NutritionLogModule } from './modules/domain-health-and-insights/vy-nutrition-log/vy-nutrition-log.module';
import { DevelopmentLogModule } from './modules/domain-health-and-insights/vy-development-log/vy-development-log.module';
import { CareLogModule } from './modules/domain-health-and-insights/vy-care-log/vy-care-log.module';
import { PersonBabyModule } from './modules/domain-person-and-identity/vy-person-baby/vy-person-baby.module';
import { PersonConsumerModule } from './modules/domain-person-and-identity/vy-person-consumer/vy-person-consumer.module';
import { PersonCosharerModule } from './modules/domain-person-and-identity/vy-person-cosharer/vy-person-cosharer.module';
import { PersonEmployeeModule } from './modules/domain-person-and-identity/vy-person-employee/vy-person-employee.module';
import { PersonFamilyGraphModule } from './modules/domain-person-and-identity/vy-person-family-graph/vy-person-family-graph.module';
import { PersonIdentityModule } from './modules/domain-person-and-identity/vy-person-identity/vy-person-identity.module';
import { PersonMilkGiverModule } from './modules/domain-person-and-identity/vy-person-milk-giver/vy-person-milk-giver.module';
import { PersonParentModule } from './modules/domain-person-and-identity/vy-person-parent/vy-person-parent.module';
import { PersonProviderModule } from './modules/domain-person-and-identity/vy-person-provider/vy-person-provider.module';
import { PersonRolesModule } from './modules/domain-person-and-identity/vy-person-roles/vy-person-roles.module';
import { PersonEmailModule } from './modules/domain-person-and-identity/vy-person-email/vy-person-email.module';
import { PersonSessionModule } from './modules/domain-person-and-identity/vy-session/vy-session.module';
import { PersonPhysicalAddressModule } from './modules/domain-person-and-identity/vy-physical-address/vy-physical-address.module';
import { DataVaultModule } from './modules/domain-privacy-and-consent/vy-data-vault/vy-data-vault.module';
import { ResearchConsentModule } from './modules/domain-privacy-and-consent/vy-research-consent/vy-research-consent.module';
import { SalesAffiliateProductsModule } from './modules/domain-sales-and-commerce/vy-sales-affiliate-products/vy-sales-affiliate-products.module';
import { SalesReferralsModule } from './modules/domain-sales-and-commerce/vy-sales-referrals/vy-sales-referrals.module';
import { SalesSubscriptionsModule } from './modules/domain-sales-and-commerce/vy-sales-subscriptions/vy-sales-subscriptions.module';
import { SalesCommerceModule } from './modules/domain-sales-and-commerce/vy-commerce/vy-commerce.module';
import { AuthModule } from './modules/auth/auth.module';

import { KafkaModule } from './utils/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' },
      global: true,
    }),

    //Caching Module
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: 600,
      isGlobal: true,
    }),
    //Throttle requests
    ThrottlerModule.forRoot([
      {
        ttl: 5,
        limit: 60,
      },
    ]),
    KafkaModule,
    WebhooksModule,
    EducationFeedModule,
    EmotionalEngagementModule,
    FinancePaymentsModule,
    FinanceWalletModule,
    HealthCryAnalyzerModule,
    HealthGrowthTrackerModule,
    HealthLogModule,
    HealthSleepModule,
    NutritionLogModule,
    DevelopmentLogModule,
    CareLogModule,
    PersonBabyModule,
    PersonConsumerModule,
    PersonCosharerModule,
    PersonEmployeeModule,
    PersonFamilyGraphModule,
    PersonIdentityModule,
    PersonMilkGiverModule,
    PersonParentModule,
    PersonProviderModule,
    PersonRolesModule,
    PersonPhysicalAddressModule,
    PersonEmailModule,
    PersonSessionModule,
    DataVaultModule,
    ResearchConsentModule,
    SalesAffiliateProductsModule,
    SalesReferralsModule,
    SalesSubscriptionsModule,
    SalesCommerceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
    SentryInterceptor,
  ],
})
export class AppModule implements NestModule {
  private logger = getLoggerConfig(AppModule.name);

  constructor() {
    this.logger.debug(
      `${AppModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeds/seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessUnitModule } from './modules/business-unit/business-operators.module';
import { CFG_TOKEN_TYPEORM } from './config/config.tokens';
import typeorm from './config/typeorm/typeorm';

import { getLoggerConfig } from './utils/common';
import { ensureDatabaseExists } from './utils/db-init';
import { LogStreamLevel } from 'ez-logger';
import { OperatorModule } from './modules/operator/operator.module';
import { DeviceSessionModule } from './modules/device-session/device-operators.module';
import { OperatorSessionModule } from './modules/operator-session/operator-session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const cfg = await configService.get(CFG_TOKEN_TYPEORM);
        await ensureDatabaseExists({
          host: cfg.host,
          port: cfg.port,
          user: cfg.username,
          password: cfg.password,
          database: cfg.database,
          ssl: cfg.ssl,
        });
        return cfg;
      },
    }),

    BusinessUnitModule,
    DeviceSessionModule,
    OperatorModule,
    OperatorSessionModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {
  private logger = getLoggerConfig(AppModule.name);

  constructor() {
    this.logger.debug(
      `${AppModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm/typeorm';
import { CFG_TOKEN_TYPEORM } from './config/config.tokens';
import { DevelopmentModule } from './modules/development/development.module';
import { getLoggerConfig } from './utils/common';
import { ensureDatabaseExists } from './utils/db-init';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
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
    DevelopmentModule,
  ],
  controllers: [],
  providers: [],
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

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm/typeorm';
import { CFG_TOKEN_TYPEORM } from './config/config.tokens';
import { CoreModule } from './modules/core/core.module';
import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await configService.get(CFG_TOKEN_TYPEORM);
      },
    }),
    CoreModule,
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

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CFG_TOKEN_TYPEORM } from './config/config.tokens';
import typeorm from './config/typeorm/typeorm';

import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';
import { MechanismPermitsModule } from './modules/mechanism-permits/mechanism-permit.module';
import { PermissionProfileModule } from './modules/permission-profile/permission-profile.module';
import { SystemMechanismModule } from './modules/system-mechanism/system-mechanism.module';
import { OperatorPermissionProfileModule } from './modules/operator-permission-profile/operator-permission-profile.module';
import { PermissionProfileManagedThroughMechanismPermitModule } from './modules/permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.module';

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
        return await configService.get(CFG_TOKEN_TYPEORM);
      },
    }),

    MechanismPermitsModule,
    OperatorPermissionProfileModule,
    PermissionProfileModule,
    SystemMechanismModule,
    PermissionProfileManagedThroughMechanismPermitModule,
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

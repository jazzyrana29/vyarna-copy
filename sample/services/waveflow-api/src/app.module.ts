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

import { AuthService } from './services/auth.service';
import { ConfigCatService } from './services/ConfigCat/cofigcat.service';
import { AppService } from './app.service';

import { AppLoggerMiddleware } from './middlewares/app.log.middleware';

import { AppController } from './app.controller';

import { ActionModule } from './modules/waveflow-core/action/action.module';
import { BusinessUnitModule } from './modules/operators/business-unit/business-unit.module';
import { DeviceSessionModule } from './modules/operators/device-session/device-session.module';
import { EvaluationOperatorModule } from './modules/waveflow-core/evaluation-operator/evaluation-operator.module';
import { EvaluationVariableCollectionModule } from './modules/waveflow-core/evaluation-variable-collection/evaluation-variable-collection.module';
import { EvaluationVariableCollectionPortfolioModule } from './modules/waveflow-core/evaluation-variable-collection-portfolio/evaluation-variable-collection-portfolio.module';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosModule } from './modules/waveflow-core/evaluation-variable-collections-are-presented-through-portfolios/evaluation-variable-collections-are-presented-through-portfolios.module';
import { EvaluationVariableDataTypesModule } from './modules/waveflow-core/evaluation-variable-data-type/evaluation-variable-data-type.module';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule } from './modules/waveflow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection/evaluation-variable-is-grouped-through-evaluation-variable-collection.module';
import { EvaluationVariableModule } from './modules/waveflow-core/evaluation-variable/evaluation-variable.module';
import { EvaluationVariablesAreAvailableForWaveTypesModule } from './modules/waveflow-core/evaluation-variables-are-available-for-wave-types/evaluation-variables-are-available-for-wave-types.module';
import { FilterModule } from './modules/waveflow-core/filter/filter.module';
import { FilterSubsetItemModule } from './modules/waveflow-core/filter-subset-item/filter-subset-item.module';
import { FilterSubsetModule } from './modules/waveflow-core/filter-subset/filter-subset.module';
import { FlowIsActiveForWaveTypeAndBusinessUnitModule } from './modules/waveflow-core/flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.module';
import { FlowModule } from './modules/waveflow-core/flow/flow.module';
import { InputValueTypesModule } from './modules/waveflow-core/input-value-type/input-value-type.module';
import { KafkaModule } from './utils/kafka/kafka.module';
import { ManifoldModule } from './modules/waveflow-core/manifold/manifold.module';
import { MechanismPermitModule } from './modules/operator-permissions/mechanism-permit/mechanism-permit.module';
import { NodeExitModule } from './modules/waveflow-core/node-exit/node-exit.module';
import { NodeExitTypesModule } from './modules/waveflow-core/node-exit-type/node-exit-type.module';
import { NodeModule } from './modules/waveflow-core/node/node.module';
import { NodeTypeModule } from './modules/waveflow-core/node-type/node-type.module';
import { OperatorModule } from './modules/operators/operator/operator.module';
import { OperatorPermissionProfileModule } from './modules/operator-permissions/operator-permisssion-profile/operator-permission-profile.module';
import { OperatorSessionModule } from './modules/operators/operator-session/operator-session.module';
import { PermissionProfileManagedThroughMechanismPermitModule } from './modules/operator-permissions/permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.module';
import { PermissionProfileModule } from './modules/operator-permissions/permission-profile/permission-profile.module';
import { SystemMechanismModule } from './modules/operator-permissions/system-mechanism/system-mechanism.module';
import { TaskHasReceivedInputValueOfTypeModule } from './modules/waveflow-core/task-has-received-input-value-of-type/task-has-received-input-value-of-type.module';
import { TaskModule } from './modules/waveflow-core/task/task.module';
import { TaskStatusModule } from './modules/waveflow-core/task-status/task-status.module';
import { TaskTypeHaveAccessToBusinessUnitModule } from './modules/waveflow-core/task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.module';
import { TaskTypeModule } from './modules/waveflow-core/task-type/task-type.module';
import { TaskTypesReceiveInputValueTypeModule } from './modules/waveflow-core/task-types-receive-input-value-type/task-types-receive-input-value-type.module';
import { WaveModule } from './modules/waveflow-core/wave/wave.module';
import { WaveTypeGenreCanUtilizeBusinessUnitModule } from './modules/waveflow-core/wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.module';
import { WaveTypeGenreModule } from './modules/waveflow-core/wave-type-genre/wave-type-genre.module';
import { WaveTypeIsAllowedToAccessBusinessUnitModule } from './modules/waveflow-core/wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.module';
import { WaveTypeModule } from './modules/waveflow-core/wave-type/wave-type.module';

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
    // Operators
    BusinessUnitModule,
    DeviceSessionModule,
    OperatorModule,
    OperatorSessionModule,
    // Operator-Permissions
    MechanismPermitModule,
    OperatorPermissionProfileModule,
    PermissionProfileModule,
    PermissionProfileManagedThroughMechanismPermitModule,
    SystemMechanismModule,
    // Wave-Flow-Core
    ActionModule,
    EvaluationOperatorModule,
    EvaluationVariableCollectionModule,
    EvaluationVariableCollectionPortfolioModule,
    EvaluationVariableCollectionsArePresentedThroughPortfoliosModule,
    EvaluationVariableDataTypesModule,
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule,
    EvaluationVariablesAreAvailableForWaveTypesModule,
    EvaluationVariableModule,
    FilterModule,
    FilterSubsetItemModule,
    FilterSubsetModule,
    FlowModule,
    FlowIsActiveForWaveTypeAndBusinessUnitModule,
    InputValueTypesModule,
    ManifoldModule,
    NodeModule,
    NodeExitModule,
    NodeExitTypesModule,
    NodeTypeModule,
    TaskModule,
    TaskHasReceivedInputValueOfTypeModule,
    TaskStatusModule,
    TaskTypeModule,
    TaskTypesReceiveInputValueTypeModule,
    TaskTypeHaveAccessToBusinessUnitModule,
    WaveModule,
    WaveTypeModule,
    WaveTypeIsAllowedToAccessBusinessUnitModule,
    WaveTypeGenreModule,
    WaveTypeGenreCanUtilizeBusinessUnitModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
    AuthService,
    SentryInterceptor,
    ConfigCatService,
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

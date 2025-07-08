import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeds/seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getLoggerConfig } from './utils/common';
import { ensureDatabaseExists } from './utils/db-init';
import { LogStreamLevel } from 'ez-logger';
import { CFG_TOKEN_TYPEORM } from './config/config.tokens';
import typeorm from './config/typeorm/typeorm';

import { ActionModule } from './modules/action/action.module';
import { EvaluationOperatorModule } from './modules/evaluation-operator/evaluation-operator.module';
import { EvaluationVariableCollectionModule } from './modules/evaluation-variable-collection/evaluation-variable-collection.module';
import { EvaluationVariableCollectionPortfolioModule } from './modules/evaluation-variable-collection-portfolio/evaluation-variable-collection-portfolio.module';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosModule } from './modules/evaluation-variable-collections-are-presented-through-portfolios/evaluation-variable-collections-are-presented-through-portfolios.module';
import { EvaluationVariableDataTypeModule } from './modules/evaluation-variable-data-type/evaluation-variable-data-type.module';
import { EvaluationVariableModule } from './modules/evaluation-variable/evaluation-variable.module';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule } from './modules/evaluation-variable-is-grouped-through-evaluation-variable-collection/evaluation-variable-is-grouped-through-evaluation-variable-collection.module';
import { EvaluationVariablesAreAvailableForWaveTypesModule } from './modules/evaluation-variables-are-available-for-wave-types/evaluation-variables-are-available-for-wave-types.module';
import { FilterModule } from './modules/filter/filter.module';
import { FilterSubsetItemModule } from './modules/filter-subset-item/filter-subset-item.module';
import { FilterSubsetModule } from './modules/filter-subset/filter-subset.module';
import { FlowIsActiveForWaveTypeAndBusinessUnitModule } from './modules/flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.module';
import { FlowModule } from './modules/flow/flow.module';
import { InputValueTypeModule } from './modules/input-value-type/input-value-type.module';
import { ManifoldModule } from './modules/manifold/manifold.module';
import { NodeExitModule } from './modules/node-exit/node-exit.module';
import { NodeModule } from './modules/node/node.module';
import { NodeExitTypeModule } from './modules/node-exit-type/node-exit-type.module';
import { NodeTypeModule } from './modules/node-type/node-type.module';
import { TaskHasReceiveInputValueOfTypeModule } from './modules/task-has-received-input-value-of-type/task-has-received-input-value-of-type.module';
import { TaskModule } from './modules/task/task.module';
import { TaskStatusesModule } from './modules/task-status/task-status.module';
import { TaskTypeHaveAccessToBusinessUnitModule } from './modules/task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.module';
import { TaskTypeModule } from './modules/task-type/task-type.module';
import { TaskTypesReceiveInputValueTypeModule } from './modules/task-types-receive-input-value-type/task-types-receive-input-value-types.module';
import { WaveModule } from './modules/wave/wave.module';
import { WaveTypeGenreCanUtilizeBusinessUnitModule } from './modules/wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.module';
import { WaveTypeGenreModule } from './modules/wave-type-genre/wave-type-genre.module';
import { WaveTypeIsAllowedToAccessBusinessUnitModule } from './modules/wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.module';
import { WaveTypeModule } from './modules/wave-type/wave-type.module';

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
    ActionModule,
    EvaluationOperatorModule,
    EvaluationVariableModule,
    EvaluationVariableCollectionModule,
    EvaluationVariableCollectionPortfolioModule,
    EvaluationVariableCollectionsArePresentedThroughPortfoliosModule,
    EvaluationVariableDataTypeModule,
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule,
    EvaluationVariablesAreAvailableForWaveTypesModule,
    FilterModule,
    FilterSubsetModule,
    FilterSubsetItemModule,
    FlowModule,
    FlowIsActiveForWaveTypeAndBusinessUnitModule,
    InputValueTypeModule,
    ManifoldModule,
    NodeModule,
    NodeExitModule,
    NodeExitTypeModule,
    NodeTypeModule,
    TaskModule,
    TaskHasReceiveInputValueOfTypeModule,
    TaskTypeHaveAccessToBusinessUnitModule,
    TaskStatusesModule,
    TaskTypeModule,
    TaskTypesReceiveInputValueTypeModule,
    WaveModule,
    WaveTypeModule,
    WaveTypeIsAllowedToAccessBusinessUnitModule,
    WaveTypeGenreModule,
    WaveTypeGenreCanUtilizeBusinessUnitModule,
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

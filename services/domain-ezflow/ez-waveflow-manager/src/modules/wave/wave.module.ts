import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Wave } from '../../entities/wave.entity';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { Flow } from '../../entities/flow.entity';
import { Node } from '../../entities/node.entity';
import { Task } from '../../entities/task.entity';
import { ZtrackingWave } from '../../entities/ztracking-wave.entity';
import { Action } from '../../entities/action.entity';
import { TaskStatus } from '../../entities/task-status.entity';
import { NodeExit } from '../../entities/node-exit.entity';

import { WaveService } from './services/wave.service';
import { WaveExecutionService } from './services/wave-execution.service';
import { WaveKafkaService } from './services/wave-kafka.service';
import { ZtrackingWaveService } from './services/ztracking-wave.service';

import { FlowVariableValidatorService } from './services/wave-execution/flow-variable-validator.service';
import { NodeHandlerService } from './services/wave-execution/node-handler.service';
import { FilterEvaluatorService } from './services/wave-execution/filter-evaluator.service';
import { TaskHandlerService } from './services/wave-execution/task-handler.service';
import { ActionHandlerService } from './services/wave-execution/action-handler.service';

import { WaveController } from './wave.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wave,
      Flow,
      Node,
      NodeExit,
      Action,
      Task,
      TaskStatus,
      FlowIsActiveForWaveTypeAndBusinessUnit,
      ZtrackingWave,
    ]),
  ],
  controllers: [WaveController],
  providers: [
    WaveService,
    WaveExecutionService,
    FlowVariableValidatorService,
    NodeHandlerService,
    FilterEvaluatorService,
    ActionHandlerService,
    TaskHandlerService,
    WaveKafkaService,
    ZtrackingWaveService,
  ],
})
export class WaveModule {
  private logger = getLoggerConfig(WaveModule.name);

  constructor() {
    this.logger.debug(
      `${WaveModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

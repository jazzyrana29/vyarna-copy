import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeExitType } from '../../entities/node-exit-type.entity';

import { NodeExitTypeService } from './services/node-exit-type.service';
import { NodeExitTypeKafkaService } from './services/node-exit-type-kafka.service';

import { NodeExitTypeController } from './node-exit-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NodeExitType])],
  controllers: [NodeExitTypeController],
  providers: [NodeExitTypeService, NodeExitTypeKafkaService],
})
export class NodeExitTypeModule {
  private logger = getLoggerConfig(NodeExitTypeModule.name);

  constructor() {
    this.logger.debug(
      `${NodeExitTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

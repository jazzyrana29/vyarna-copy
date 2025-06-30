import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeType } from '../../entities/node-type.entity';

import { NodeTypeService } from './services/node-type.service';
import { NodeTypeKafkaService } from './services/node-type-kafka.service';

import { NodeTypeController } from './node-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NodeType])],
  providers: [NodeTypeKafkaService, NodeTypeService],
  controllers: [NodeTypeController],
})
export class NodeTypeModule {
  private logger = getLoggerConfig(NodeTypeModule.name);

  constructor() {
    this.logger.debug(
      `${NodeTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

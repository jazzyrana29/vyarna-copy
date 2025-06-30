import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeExit } from '../../entities/node-exit.entity';
import { Node } from '../../entities/node.entity';
import { ZtrackingNodeExit } from '../../entities/ztracking-node-exit.entity';

import { NodeExitService } from './services/node-exit.service';
import { NodeExitKafkaService } from './services/node-exit-kafka.service';
import { ZtrackingNodeExitService } from './services/ztracking-node-exit.service';

import { NodeExitController } from './node-exit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NodeExit, Node, ZtrackingNodeExit])],
  controllers: [NodeExitController],
  providers: [NodeExitService, NodeExitKafkaService, ZtrackingNodeExitService],
})
export class NodeExitModule {
  private logger = getLoggerConfig(NodeExitModule.name);

  constructor() {
    this.logger.debug(
      `${NodeExitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

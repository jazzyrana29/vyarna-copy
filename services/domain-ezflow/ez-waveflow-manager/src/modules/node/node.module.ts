import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Node } from '../../entities/node.entity';
import { Flow } from '../../entities/flow.entity';
import { NodeType } from '../../entities/node-type.entity';
import { NodeExitType } from '../../entities/node-exit-type.entity';
import { NodeExit } from '../../entities/node-exit.entity';
import { Manifold } from '../../entities/manifold.entity';
import { ZtrackingNode } from '../../entities/ztracking-node.entity';
import { ZtrackingManifold } from '../../entities/ztracking-manifold.entity';
import { Action } from '../../entities/action.entity';
import { ActionVariable } from '../../entities/action-variable.entity';
import { ZtrackingAction } from '../../entities/ztracking-action.entity';

import { NodeService } from './services/node.service';
import { NodeKafkaService } from './services/node-kafka.service';
import { ZtrackingNodeService } from './services/ztracking-node.service';
import { ZtrackingManifoldService } from '../../modules/manifold/services/ztracking-manifold.service';
import { ActionService } from '../action/services/action.service';
import { ZtrackingActionService } from '../action/services/ztracking-action.service';
import { ManifoldService } from '../manifold/services/manifold.service';

import { NodeController } from './node.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Node,
      Flow,
      NodeType,
      NodeExitType,
      NodeExit,
      Manifold,
      Action,
      ActionVariable,
      ZtrackingManifold,
      ZtrackingNode,
      ZtrackingAction,
    ]),
  ],
  controllers: [NodeController],
  providers: [
    NodeService,
    ManifoldService,
    ActionService,
    NodeKafkaService,
    ZtrackingNodeService,
    ZtrackingManifoldService,
    ZtrackingActionService,
  ],
})
export class NodeModule {
  private logger = getLoggerConfig(NodeModule.name);

  constructor() {
    this.logger.debug(
      `${NodeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

import { Flow } from '../../entities/flow.entity';
import { Node } from '../../entities/node.entity';
import { NodeType } from '../../entities/node-type.entity';
import { NodeExit } from '../../entities/node-exit.entity';
import { NodeExitType } from '../../entities/node-exit-type.entity';
import { Manifold } from '../../entities/manifold.entity';
import { Filter } from '../../entities/filter.entity';
import { FilterSubset } from '../../entities/filter-subset.entity';
import { FilterSubsetItem } from '../../entities/filter-subset-item.entity';
import { Action } from '../../entities/action.entity';
import { ActionVariable } from '../../entities/action-variable.entity';
import { ZtrackingFlow } from '../../entities/ztracking-flow.entity';
import { ZtrackingNode } from '../../entities/ztracking-node.entity';
import { ZtrackingNodeExit } from '../../entities/ztracking-node-exit.entity';
import { ZtrackingManifold } from '../../entities/ztracking-manifold.entity';
import { ZtrackingFilter } from '../../entities/ztracking-filter.entity';
import { ZtrackingFilterSubset } from '../../entities/ztracking-filter-subset.entity';
import { ZtrackingFilterSubsetItem } from '../../entities/ztracking-filter-subset-item.entity';
import { ZtrackingAction } from '../../entities/ztracking-action.entity';

import { FlowService } from './services/flow.service';
import { FlowKafkaService } from './services/flow-kafka.service';
import { ZtrackingFlowService } from './services/ztracking-flow.service';
import { NodeService } from '../node/services/node.service';
import { ManifoldService } from '../manifold/services/manifold.service';
import { ActionService } from '../action/services/action.service';
import { ZtrackingNodeService } from '../node/services/ztracking-node.service';
import { ZtrackingNodeExitService } from '../node-exit/services/ztracking-node-exit.service';
import { ZtrackingManifoldService } from '../manifold/services/ztracking-manifold.service';
import { ZtrackingFilterService } from '../filter/services/ztracking-filter.service';
import { ZtrackingFilterSubsetService } from '../filter-subset/services/ztracking-filter-subset.service';
import { ZtrackingFilterSubsetItemService } from '../filter-subset-item/services/ztracking-filter-subset-item.service';
import { ZtrackingActionService } from '../action/services/ztracking-action.service';

import { FlowController } from './flow.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Flow,
      Node,
      NodeType,
      NodeExit,
      NodeExitType,
      Manifold,
      Filter,
      FilterSubset,
      FilterSubsetItem,
      Action,
      ActionVariable,
      ZtrackingFlow,
      ZtrackingNode,
      ZtrackingNodeExit,
      ZtrackingManifold,
      ZtrackingFilter,
      ZtrackingFilterSubset,
      ZtrackingFilterSubsetItem,
      ZtrackingAction,
    ]),
  ],
  controllers: [FlowController],
  providers: [
    FlowService,
    FlowKafkaService,
    NodeService,
    ManifoldService,
    ActionService,
    ZtrackingFlowService,
    ZtrackingNodeService,
    ZtrackingNodeExitService,
    ZtrackingFilterService,
    ZtrackingManifoldService,
    ZtrackingFilterSubsetService,
    ZtrackingFilterSubsetItemService,
    ZtrackingActionService,
  ],
})
export class FlowModule {
  private logger = getLoggerConfig(FlowModule.name);

  constructor() {
    this.logger.debug(
      `${FlowModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

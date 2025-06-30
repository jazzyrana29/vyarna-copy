import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Filter } from '../../entities/filter.entity';
import { NodeExit } from '../../entities/node-exit.entity';
import { Node } from '../../entities/node.entity';
import { NodeExitType } from '../../entities/node-exit-type.entity';
import { ZtrackingFilter } from '../../entities/ztracking-filter.entity';

import { FilterService } from './services/filter.service';
import { FilterKafkaService } from './services/filter-kafka.service';
import { ZtrackingFilterService } from './services/ztracking-filter.service';

import { FilterController } from './filter.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Filter,
      NodeExit,
      Node,
      NodeExitType,
      ZtrackingFilter,
    ]),
  ],
  controllers: [FilterController],
  providers: [FilterService, FilterKafkaService, ZtrackingFilterService],
})
export class FilterModule {
  private logger = getLoggerConfig(FilterModule.name);

  constructor() {
    this.logger.debug(
      `${FilterModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

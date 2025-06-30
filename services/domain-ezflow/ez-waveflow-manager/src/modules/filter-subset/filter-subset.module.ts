import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubset } from '../../entities/filter-subset.entity';
import { ZtrackingFilterSubset } from '../../entities/ztracking-filter-subset.entity';
import { Filter } from '../../entities/filter.entity';

import { FilterSubsetService } from './services/filter-subset.service';
import { FilterSubsetKafkaService } from './services/filter-subset-kafka.service';
import { ZtrackingFilterSubsetService } from './services/ztracking-filter-subset.service';

import { FilterSubsetController } from './filter-subset.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Filter, FilterSubset, ZtrackingFilterSubset]),
  ],
  controllers: [FilterSubsetController],
  providers: [
    FilterSubsetService,
    FilterSubsetKafkaService,
    ZtrackingFilterSubsetService,
  ],
})
export class FilterSubsetModule {
  private logger = getLoggerConfig(FilterSubsetModule.name);

  constructor() {
    this.logger.debug(
      `${FilterSubsetModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

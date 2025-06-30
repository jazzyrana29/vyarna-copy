import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubsetItem } from '../../entities/filter-subset-item.entity';
import { ZtrackingFilterSubsetItem } from '../../entities/ztracking-filter-subset-item.entity';

import { FilterSubsetItemService } from './services/filter-subset-item.service';
import { FilterSubsetItemKafkaService } from './services/filter-subset-item-kafka.service';
import { ZtrackingFilterSubsetItemService } from './services/ztracking-filter-subset-item.service';

import { FilterSubsetItemController } from './filter-subset-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilterSubsetItem, ZtrackingFilterSubsetItem]),
  ],
  controllers: [FilterSubsetItemController],
  providers: [
    FilterSubsetItemService,
    FilterSubsetItemKafkaService,
    ZtrackingFilterSubsetItemService,
  ],
})
export class FilterSubsetItemModule {
  private logger = getLoggerConfig(FilterSubsetItemModule.name);

  constructor() {
    this.logger.debug(
      `${FilterSubsetItemModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Manifold } from '../../entities/manifold.entity';
import { Node } from '../../entities/node.entity';
import { ZtrackingManifold } from '../../entities/ztracking-manifold.entity';

import { ManifoldService } from './services/manifold.service';
import { ManifoldKafkaService } from './services/manifold-kafka.service';
import { ZtrackingManifoldService } from './services/ztracking-manifold.service';

import { ManifoldController } from './manifold.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manifold, Node, ZtrackingManifold])],
  controllers: [ManifoldController],
  providers: [ManifoldService, ManifoldKafkaService, ZtrackingManifoldService],
})
export class ManifoldModule {
  private logger = getLoggerConfig(ManifoldModule.name);

  constructor() {
    this.logger.debug(
      `${ManifoldModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

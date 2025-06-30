import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { InputValueType } from '../../entities/input-value-type.entity';

import { InputValueTypeService } from './services/input-value-type.service';
import { InputValueTypeKafkaService } from './services/input-value-type-kafka.service';

import { InputValueTypeController } from './input-value-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InputValueType])],
  controllers: [InputValueTypeController],
  providers: [InputValueTypeService, InputValueTypeKafkaService],
})
export class InputValueTypeModule {
  private logger = getLoggerConfig(InputValueTypeModule.name);

  constructor() {
    this.logger.debug(
      `${InputValueTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

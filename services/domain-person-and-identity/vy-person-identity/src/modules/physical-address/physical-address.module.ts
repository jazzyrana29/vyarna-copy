import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalAddress } from '../../entities/physical-address.entity';
import { PhysicalAddressController } from './physical-address.controller';
import { PhysicalAddressKafkaService } from './services/physical-address-kafka.service';
import { PhysicalAddressService } from './services/physical-address.service';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalAddress])],
  controllers: [PhysicalAddressController],
  providers: [PhysicalAddressService, PhysicalAddressKafkaService],
})
export class PhysicalAddressModule {
  private logger = getLoggerConfig(PhysicalAddressModule.name);

  constructor() {
    this.logger.debug(
      `${PhysicalAddressModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

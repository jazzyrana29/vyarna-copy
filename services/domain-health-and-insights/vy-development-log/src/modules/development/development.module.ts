import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowthMeasurement } from '../../entities/growth_measurement.entity';
import { GrowthMeasurementService } from './services/growth-measurement.service';
import { DevelopmentController } from './development.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([GrowthMeasurement])],
  controllers: [DevelopmentController],
  providers: [GrowthMeasurementService],
})
export class DevelopmentModule {
  private logger = getLoggerConfig(DevelopmentModule.name);
  constructor() {
    this.logger.debug(
      `${DevelopmentModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

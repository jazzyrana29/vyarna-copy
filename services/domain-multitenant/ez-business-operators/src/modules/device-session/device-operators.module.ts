import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceSession } from '../../entities/device-session.entity';

import { DeviceSessionController } from './device-operators.controller';

import { DeviceSessionService } from './services/device-session.service';
import { DeviceSessionKafkaService } from './services/device-session-kafka.service';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingDeviceSession } from '../../entities/ztracking-device-session.entity';
import { ZtrackingDeviceSessionService } from './services/ztracking-device-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceSession, ZtrackingDeviceSession])],
  controllers: [DeviceSessionController],
  providers: [
    DeviceSessionService,
    DeviceSessionKafkaService,
    ZtrackingDeviceSessionService,
  ],
})
export class DeviceSessionModule {
  private logger = getLoggerConfig(DeviceSessionModule.name);

  constructor() {
    this.logger.debug(
      `${DeviceSessionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}

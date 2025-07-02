import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZtrackingDeviceSession } from '../../../entities/ztracking-device-session.entity';
import { DeviceSession } from '../../../entities/device-session.entity';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { GetDeviceSessionHistoryDto } from 'ez-utils';

// Definition of the ZtrackingDeviceSessionService class
@Injectable()
export class ZtrackingDeviceSessionService {
  private logger = getLoggerConfig(ZtrackingDeviceSessionService.name);

  // Constructor with repository injection
  constructor(
    @InjectRepository(ZtrackingDeviceSession)
    private ztrackingDeviceSessionRepository: Repository<ZtrackingDeviceSession>,
  ) {
    // Logger initialization
    this.logger.debug(
      `${ZtrackingDeviceSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  // Method to create a ztracking device session entity
  async createZtrackingDeviceSessionEntity(
    deviceSession: DeviceSession,
    traceId: string,
  ): Promise<boolean> {
    // Creating and saving ztracking device session entity
    const ztrackingDeviceSession =
      await this.ztrackingDeviceSessionRepository.save(
        this.ztrackingDeviceSessionRepository.create({
          ...deviceSession,
          versionDate: new Date(),
        }),
      );
    // Logging the operation
    this.logger.info(
      `createZtrackingDeviceSessionEntity saved in database`,
      traceId,
      'createZtrackingDeviceSessionEntity',
      LogStreamLevel.ProdStandard,
    );

    // Returning the result
    return Boolean(ztrackingDeviceSession?.ztrackingVersion);
  }

  // Method to find a ztracking device session entity
  async findZtrackingDeviceSessionEntity(
    { name = '' }: GetDeviceSessionHistoryDto,
    traceId: string,
  ): Promise<ZtrackingDeviceSession[]> {
    // TODO: this method first fetching history on the base id. but tickets states it should fetch history on the base of name, or date-range. The DTO is accurate but functionality not
    // Finding ztracking device session entities by device session ID
    const ztrackingDeviceSessions =
      await this.ztrackingDeviceSessionRepository.find({
        where: { name },
      });

    // If not found, throw a NotFoundException
    if (!ztrackingDeviceSessions.length) {
      throw new NotFoundException(
        `no ztracking of device session existed with this id => ${name}`,
      );
    }

    // Logging the operation
    this.logger.info(
      `ztracking device session entity found in database`,
      traceId,
      'findZtrackingDeviceSessionEntity',
      LogStreamLevel.ProdStandard,
    );

    // Returning the found entities
    return ztrackingDeviceSessions;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, FindOptionsWhere } from 'typeorm';
import { DeviceSession } from '../../../entities/device-session.entity';
import { ZtrackingDeviceSessionService } from './ztracking-device-session.service';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  CloseDeviceSessionDto,
  CreateDeviceSessionDto,
  GetDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  StartDeviceSessionDto,
  UpdateDeviceSessionDto,
} from 'ez-utils';

@Injectable()
export class DeviceSessionService {
  private logger = getLoggerConfig(DeviceSessionService.name);

  constructor(
    @InjectRepository(DeviceSession)
    private readonly deviceSessionRepository: Repository<DeviceSession>,
    private readonly ztrackingDeviceSessionService: ZtrackingDeviceSessionService,
  ) {
    this.logger.debug(
      `${DeviceSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDeviceSession(
    createDeviceSessionDto: CreateDeviceSessionDto,
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `createDeviceSessionDto : ${JSON.stringify(createDeviceSessionDto)}`,
      traceId,
      'createDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    // Initialize startTime and lastUpdated
    const startTime = new Date().toISOString();
    const lastUpdated = startTime;

    // Combine the DTO with the initialized startTime and lastUpdated
    const newDeviceSessionDto = {
      ...createDeviceSessionDto,
      startTime,
      lastUpdated,
    };

    const deviceSession = await this.deviceSessionRepository.save(
      this.deviceSessionRepository.create(newDeviceSessionDto),
    );

    this.logger.info(
      `Device session entity saved in database`,
      traceId,
      'createDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
        deviceSession,
        traceId,
      )
    ) {
      return deviceSession;
    }
  }

  async updateDeviceSession(
    updateDeviceSessionDto: UpdateDeviceSessionDto,
    traceId: string,
  ): Promise<any> {
    const deviceSession = await this.deviceSessionRepository.findOne({
      where: {
        deviceSessionId: updateDeviceSessionDto.deviceSessionId,
      } as FindOptionsWhere<DeviceSession>,
    });

    if (!deviceSession) {
      throw new NotFoundException(
        `no device session existed with this id => ${updateDeviceSessionDto.deviceSessionId}`,
      );
    }
    const updatedDeviceSession = await this.deviceSessionRepository.save(
      updateDeviceSessionDto,
    );

    this.logger.info(
      `device session entity updated in database`,
      traceId,
      'updateDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
        updatedDeviceSession,
        traceId,
      )
    )
      return updatedDeviceSession;
  }

  async findDeviceSession(
    { deviceSessionId = '', name = '', isDeleted = false }: GetDeviceSessionDto,
    traceId: string,
  ): Promise<DeviceSession> {
    if (!deviceSessionId && !name) {
      throw new NotFoundException(
        'At least one parameter (deviceSessionId or name) must be provided',
      );
    }

    const where: FindOptionsWhere<DeviceSession> = {};

    if (deviceSessionId) where.deviceSessionId = deviceSessionId;
    if (name) where.name = name;
    where.isDeleted = isDeleted;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findDeviceSession',
      LogStreamLevel.ProdStandard,
    );
    const deviceSession = await this.deviceSessionRepository.findOne({
      where,
    });

    if (!deviceSession) {
      throw new NotFoundException(
        `No device session found with the provided criteria`,
      );
    }

    this.logger.info(
      `Device session entity found in database`,
      traceId,
      'findDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    return deviceSession;
  }

  async startDeviceSession(
    startDeviceSessionDto: StartDeviceSessionDto, // Accept a DTO for starting device session
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `startDeviceSessionDto : ${JSON.stringify(startDeviceSessionDto)}`,
      traceId,
      'startDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    const deviceSession = await this.deviceSessionRepository.save(
      this.deviceSessionRepository.create(startDeviceSessionDto),
    );

    this.logger.info(
      `device session started and entity saved in database`,
      traceId,
      'startDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
        deviceSession,
        traceId,
      )
    )
      return deviceSession;
  }

  async closeDeviceSession(
    closeDeviceSessionDto: CloseDeviceSessionDto,
    traceId: string,
  ): Promise<any> {
    // Log the received DTO
    this.logger.log(
      `closeDeviceSessionDto : ${JSON.stringify(closeDeviceSessionDto)}`,
      traceId,
      'closeDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    // Fetch the existing device session from the database
    const deviceSession = await this.deviceSessionRepository.findOne({
      where: {
        deviceSessionId: closeDeviceSessionDto.deviceSessionId,
      } as FindOptionsWhere<DeviceSession>,
    });

    // If the device session does not exist, throw an exception
    if (!deviceSession) {
      throw new NotFoundException(
        `No device session existed with this id => ${closeDeviceSessionDto.deviceSessionId}`,
      );
    }

    // Update the device session's endTime and updatedBy fields
    deviceSession.endTime = closeDeviceSessionDto.endTime;
    deviceSession.updatedBy = closeDeviceSessionDto.updatedBy;

    // Save the updated device session to the database
    const updatedDeviceSession =
      await this.deviceSessionRepository.save(deviceSession);

    // Log the successful update
    this.logger.info(
      `device session entity closed and saved in the database`,
      traceId,
      'closeDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    // Track the change using the ztracking pattern
    if (
      await this.ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
        updatedDeviceSession,
        traceId,
      )
    )
      return updatedDeviceSession;
  }

  //TODO: Not clear either its belong to zTrack history or here
  async findDeviceSessionHistory(
    getDeviceSessionHistoryDto: GetDeviceSessionHistoryDto,
    traceId: string,
  ): Promise<DeviceSession[]> {
    const {
      name = '',
      startTime = '',
      endTime = '',
    } = getDeviceSessionHistoryDto;

    const query: SelectQueryBuilder<DeviceSession> =
      this.deviceSessionRepository.createQueryBuilder('deviceSession');

    if (name) {
      query.andWhere('deviceSession.name = :name', { name });
    }

    if (startTime) {
      query.andWhere('deviceSession.startTime >= :startDate', { startTime });
    }

    if (endTime) {
      query.andWhere('deviceSession.endTime <= :endDate', { endTime });
    }

    this.logger.debug(
      `Executing query for device session history with filters: ${JSON.stringify(getDeviceSessionHistoryDto)}`,
      traceId,
      'findDeviceSessionHistory',
      LogStreamLevel.ProdStandard,
    );

    const deviceSessions = await query.getMany();

    if (!deviceSessions.length) {
      this.logger.warn(
        `No device sessions found with the provided criteria`,
        traceId,
        'findDeviceSessionHistory',
        LogStreamLevel.ProdStandard,
      );
    } else {
      this.logger.info(
        `Device sessions found: ${deviceSessions.length}`,
        traceId,
        'findDeviceSessionHistory',
        LogStreamLevel.ProdStandard,
      );
    }

    return deviceSessions;
  }
}

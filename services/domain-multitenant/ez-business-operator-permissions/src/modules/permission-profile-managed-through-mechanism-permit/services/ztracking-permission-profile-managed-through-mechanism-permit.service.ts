import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingPermissionProfileManagedThroughMechanismPermit } from '../../../entities/ztracking-permission-profile-managed-through-mechanism-permit.entity';
import { PermissionProfileManagedThroughMechanismPermit } from '../../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  ZtrackingPermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingPermissionProfileManagedThroughMechanismPermitService {
  private logger = getLoggerConfig(
    ZtrackingPermissionProfileManagedThroughMechanismPermitService.name,
  );

  constructor(
    @InjectRepository(ZtrackingPermissionProfileManagedThroughMechanismPermit)
    private readonly ztrackingRepository: Repository<ZtrackingPermissionProfileManagedThroughMechanismPermit>,
  ) {
    this.logger.debug(
      `${ZtrackingPermissionProfileManagedThroughMechanismPermitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingPermissionProfileManagedThroughMechanismPermitEntity(
    entity: PermissionProfileManagedThroughMechanismPermit,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        mechanismPermitId: entity.mechanismPermitId,
        permissionProfileId: entity.permissionProfileId,
        isPermitted: entity.isPermitted,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `Ztracking entity for PermissionProfileManagedThroughMechanismPermit saved in database`,
      traceId,
      'createZtrackingPermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingPermissionProfileManagedThroughMechanismPermitEntities(
    {
      mechanismPermitId = '',
      permissionProfileId = '',
    }: GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
    traceId: string,
  ): Promise<ZtrackingPermissionProfileManagedThroughMechanismPermitDto[]> {
    const conditions: any = {};
    if (mechanismPermitId) {
      conditions.mechanismPermitId = mechanismPermitId;
    }
    if (permissionProfileId) {
      conditions.permissionProfileId = permissionProfileId;
    }

    if (!Object.keys(conditions).length) {
      throw new NotFoundException(
        'At least one parameter (mechanismPermitId or permissionProfileId) must be provided',
      );
    }

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(conditions)}`,
      traceId,
      'findZtrackingPermissionProfileManagedThroughMechanismPermitEntities',
      LogStreamLevel.DebugLight,
    );

    const ztrackingEntities = await this.ztrackingRepository.find({
      where: conditions,
    });

    if (!ztrackingEntities.length) {
      throw new NotFoundException(
        `No ztracking data found for the provided criteria`,
      );
    }

    this.logger.info(
      `Ztracking entities for PermissionProfileManagedThroughMechanismPermit found in database`,
      traceId,
      'findZtrackingPermissionProfileManagedThroughMechanismPermitEntities',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}

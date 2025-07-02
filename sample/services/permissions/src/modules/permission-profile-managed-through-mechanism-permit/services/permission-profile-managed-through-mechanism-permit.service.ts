import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionProfileManagedThroughMechanismPermit } from '../../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './ztracking-permission-profile-managed-through-mechanism-permit.service';
import {
  CreatePermissionProfileManagedThroughMechanismPermitDto,
  GetPermissionProfileManagedThroughMechanismPermitDto,
  PermissionProfileManagedThroughMechanismPermitDto,
  UpdatePermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

@Injectable()
export class PermissionProfileManagedThroughMechanismPermitService {
  private logger = getLoggerConfig(
    PermissionProfileManagedThroughMechanismPermitService.name,
  );

  constructor(
    @InjectRepository(PermissionProfileManagedThroughMechanismPermit)
    private readonly permissionProfileManagedThroughMechanismPermitRepository: Repository<PermissionProfileManagedThroughMechanismPermit>,
    private readonly ztrackingPermissionProfileManagedThroughMechanismPermitService: ZtrackingPermissionProfileManagedThroughMechanismPermitService,
  ) {
    this.logger.debug(
      `${PermissionProfileManagedThroughMechanismPermitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPermissionProfileManagedThroughMechanismPermit(
    createDto: CreatePermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermit> {
    this.logger.log(
      `createDto : ${JSON.stringify(createDto)}`,
      traceId,
      'createPermissionProfileManagedThroughMechanismPermit',
      LogStreamLevel.ProdStandard,
    );

    const newPermissionProfileManagedThroughMechanismPermit =
      await this.permissionProfileManagedThroughMechanismPermitRepository.save(
        this.permissionProfileManagedThroughMechanismPermitRepository.create(
          createDto,
        ),
      );

    this.logger.info(
      `PermissionProfileManagedThroughMechanismPermit entity saved in database`,
      traceId,
      'createPermissionProfileManagedThroughMechanismPermit',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingPermissionProfileManagedThroughMechanismPermitService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity(
        newPermissionProfileManagedThroughMechanismPermit,
        traceId,
      )
    ) {
      return newPermissionProfileManagedThroughMechanismPermit;
    }
  }

  async updatePermissionProfileManagedThroughMechanismPermit(
    updatePermissionProfileManagedThroughMechanismPermitDto: UpdatePermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermit> {
    const { permissionProfileId = '', mechanismPermitId = '' } =
      updatePermissionProfileManagedThroughMechanismPermitDto;
    const permissionProfileManagedThroughMechanismPermit =
      await this.permissionProfileManagedThroughMechanismPermitRepository.findOne(
        {
          where: { mechanismPermitId, permissionProfileId },
        },
      );

    if (!permissionProfileManagedThroughMechanismPermit) {
      throw new NotFoundException(
        `No permissionProfileManagedThroughMechanismPermit entity found with mechanismPermitId ${mechanismPermitId} and permissionProfileId ${permissionProfileId}`,
      );
    }

    Object.assign(
      permissionProfileManagedThroughMechanismPermit,
      updatePermissionProfileManagedThroughMechanismPermitDto,
    );

    const updatedPermissionProfileManagedThroughMechanismPermit =
      await this.permissionProfileManagedThroughMechanismPermitRepository.save(
        permissionProfileManagedThroughMechanismPermit,
      );

    this.logger.info(
      `PermissionProfileManagedThroughMechanismPermit entity updated in database`,
      traceId,
      'updatePermissionProfileManagedThroughMechanismPermit',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingPermissionProfileManagedThroughMechanismPermitService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity(
        updatedPermissionProfileManagedThroughMechanismPermit,
        traceId,
      )
    ) {
      return updatedPermissionProfileManagedThroughMechanismPermit;
    }
  }

  async findAllPermissionProfileManagedThroughMechanismPermit(
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto[]> {
    const results =
      await this.permissionProfileManagedThroughMechanismPermitRepository.find();
    this.logger.info(
      `Retrieved ${results.length} PermissionProfileManagedThroughMechanismPermit entities`,
      traceId,
      'findAllPermissionProfileManagedThroughMechanismPermit',
      LogStreamLevel.ProdStandard,
    );
    return results;
  }

  async findPermissionProfileManagedThroughMechanismPermit(
    {
      mechanismPermitId = '',
      permissionProfileId = '',
    }: GetPermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermit> {
    const permissionProfileManagedThroughMechanismPermit =
      await this.permissionProfileManagedThroughMechanismPermitRepository.findOne(
        {
          where: { mechanismPermitId, permissionProfileId },
        },
      );

    if (!permissionProfileManagedThroughMechanismPermit) {
      throw new NotFoundException(
        `No permissionProfileManagedThroughMechanismPermit entity found with mechanismPermitId ${mechanismPermitId} and permissionProfileId ${permissionProfileId}`,
      );
    }

    this.logger.info(
      `PermissionProfileManagedThroughMechanismPermit entity found in database`,
      traceId,
      'findPermissionProfileManagedThroughMechanismPermit',
      LogStreamLevel.ProdStandard,
    );

    return permissionProfileManagedThroughMechanismPermit;
  }
}

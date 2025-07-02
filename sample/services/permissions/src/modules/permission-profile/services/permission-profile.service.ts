import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionProfile } from '../../../entities/permission-profile.entity';
import { ZtrackingPermissionProfileService } from './ztracking-permission-profile.service';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import {
  CreatePermissionProfileDto,
  DeletePermissionProfileEntityDto,
  GetListOfPermissionProfileDto,
  GetPermissionProfileDto,
  GetPermitsForPermissionProfileDto,
  MechanismPermitDto,
  PermissionProfileDto,
  PopulatePermissionProfileDto,
  UpdatePermissionProfileDto,
} from 'ez-utils';

import { PermissionProfileManagedThroughMechanismPermit } from '../../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { SystemMechanism } from '../../../entities/system-mechanism.entity';
import { OperatorPermissionProfile } from '../../../entities/operator-permission-profile.entity';

@Injectable()
export class PermissionProfileService {
  private logger = getLoggerConfig(PermissionProfileService.name);

  constructor(
    @InjectRepository(PermissionProfile)
    private readonly permissionProfileRepository: Repository<PermissionProfile>,
    @InjectRepository(PermissionProfileManagedThroughMechanismPermit)
    private readonly permissionProfileManagedThroughMechanismPermitRepository: Repository<PermissionProfileManagedThroughMechanismPermit>,
    @InjectRepository(SystemMechanism)
    private readonly systemMechanismRepository: Repository<SystemMechanism>,
    @InjectRepository(OperatorPermissionProfile)
    private readonly operatorPermissionProfileRepository: Repository<OperatorPermissionProfile>,
    private readonly ztrackingPermissionProfileService: ZtrackingPermissionProfileService,
  ) {
    this.logger.debug(
      `${PermissionProfileService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPermissionProfile(
    createPermissionProfileDto: CreatePermissionProfileDto,
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `createPermissionProfileDto : ${JSON.stringify(createPermissionProfileDto)}`,
      traceId,
      'createPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    const permissionProfile = await this.permissionProfileRepository.save(
      this.permissionProfileRepository.create(createPermissionProfileDto),
    );

    this.logger.info(
      `Permission profile entity saved in database`,
      traceId,
      'createPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingPermissionProfileService.createZtrackingPermissionProfileEntity(
        permissionProfile,
        traceId,
      )
    )
      return permissionProfile;
  }

  async updatePermissionProfile(
    updatePermissionProfileDto: UpdatePermissionProfileDto,
    traceId: string,
  ): Promise<any> {
    const permissionProfile = await this.permissionProfileRepository.findOne({
      where: {
        permissionProfileId: updatePermissionProfileDto.permissionProfileId,
      },
    });

    if (!permissionProfile) {
      throw new NotFoundException(
        `No permission profile found with this id => ${updatePermissionProfileDto.permissionProfileId}`,
      );
    }
    const updatedPermissionProfile =
      await this.permissionProfileRepository.save(updatePermissionProfileDto);

    this.logger.info(
      `Permission profile entity updated in database`,
      traceId,
      'updatePermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingPermissionProfileService.createZtrackingPermissionProfileEntity(
        updatedPermissionProfile,
        traceId,
      )
    )
      return updatedPermissionProfile;
  }

  async findPermissionProfile(
    {
      permissionProfileId = ' ',
      name = '',
      isDeleted = false,
    }: GetPermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfile> {
    if (!permissionProfileId && !name)
      throw new BadRequestException(
        'At least one parameter (permissionProfileId or name) must be provided',
      );

    const where = {};

    if (permissionProfileId) where['permissionProfileId'] = permissionProfileId;

    if (name) where['name'] = name;

    where['isDeleted'] = isDeleted;
    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    const permissionProfile = await this.permissionProfileRepository.findOne({
      where,
      relations: [
        'operatorPermissionProfiles',
        'permissionProfileManagedThroughMechanismPermits',
      ],
    });

    if (!permissionProfile) {
      throw new NotFoundException(
        `No permission profile found with the provided criteria`,
      );
    }

    this.logger.info(
      `Permission profile entity found in database`,
      traceId,
      'findPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    return permissionProfile;
  }

  async getListOfPermissionProfile(
    { isDeleted = false }: GetListOfPermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfileDto[]> {
    const permissionProfiles = await this.permissionProfileRepository.find({
      where: { isDeleted },
    });
    this.logger.info(
      `${permissionProfiles?.length || 0} Permission profiles found in database with matching criteria`,
      traceId,
      'getListOfPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    return permissionProfiles;
  }

  async getPermitsForPermissionProfile(
    { permissionProfileId = '' }: GetPermitsForPermissionProfileDto,
    traceId: string,
  ): Promise<MechanismPermitDto[]> {
    if (!permissionProfileId)
      throw new BadRequestException('permissionProfileId must be provided');

    const permissionProfileManagedThroughMechanismPermit =
      await this.permissionProfileManagedThroughMechanismPermitRepository.findOne(
        {
          where: { permissionProfileId },
        },
      );

    if (!permissionProfileManagedThroughMechanismPermit)
      throw new BadRequestException(
        'No mechanism Permit found for this permissionProfileId',
      );

    this.logger.info(
      `${permissionProfileManagedThroughMechanismPermit} found in database`,
      traceId,
      'getPermitsForPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    const systemMechanism = await this.systemMechanismRepository.findOne({
      where: {
        systemMechanismId:
          permissionProfileManagedThroughMechanismPermit.mechanismPermit
            .systemMechanismId,
      },
    });

    return systemMechanism.mechanismPermits;
  }

  async deletePermissionProfile(
    { permissionProfileId = '' }: DeletePermissionProfileEntityDto,
    traceId: string,
  ): Promise<void> {
    if (!permissionProfileId)
      throw new BadRequestException('permissionProfileId must be provided');

    const permissionProfile = await this.permissionProfileRepository.findOne({
      where: { permissionProfileId },
    });
    if (!permissionProfile)
      throw new NotFoundException(
        `No permission profile found with the provided criteria`,
      );

    const deletedPermissionProfile = {
      ...permissionProfile,
      isDeleted: true,
    };
    await this.permissionProfileRepository.save(deletedPermissionProfile);

    this.logger.info(
      `Permission profile entity deleted`,
      traceId,
      'deletePermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingPermissionProfileService.createZtrackingPermissionProfileEntity(
      deletedPermissionProfile as PermissionProfile,
      traceId,
    );
  }

  async populatePermissionProfile(
    populatePermissionProfileDto: PopulatePermissionProfileDto,
    traceId: string,
  ): Promise<void> {
    this.logger.log(
      `populatePermissionProfile initiated for ID: ${populatePermissionProfileDto.permissionProfileId}`,
      traceId,
      'populatePermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    const permissionProfile = await this.permissionProfileRepository.findOne({
      where: {
        permissionProfileId: populatePermissionProfileDto.permissionProfileId,
      },
      relations: [
        'operatorPermissionProfiles',
        'permissionProfileManagedThroughMechanismPermits',
      ],
    });

    if (!permissionProfile) {
      throw new NotFoundException(
        `No permission profile found with ID: ${populatePermissionProfileDto.permissionProfileId}`,
      );
    }
    try {
      for (const {
        mechanismPermitId,
      } of populatePermissionProfileDto.permissionProfileManagedThroughMechanismPermits) {
        const newRelation =
          this.permissionProfileManagedThroughMechanismPermitRepository.create({
            permissionProfileId: permissionProfile.permissionProfileId,
            mechanismPermitId,
          });
        await this.permissionProfileManagedThroughMechanismPermitRepository.save(
          newRelation,
        );
        permissionProfile.permissionProfileManagedThroughMechanismPermits.push(
          newRelation,
        );
      }

      for (const {
        operatorId,
      } of populatePermissionProfileDto.operatorPermissionProfiles) {
        const newOperatorRelation =
          this.operatorPermissionProfileRepository.create({
            permissionProfileId: permissionProfile.permissionProfileId,
            operatorId,
          });
        await this.operatorPermissionProfileRepository.save(
          newOperatorRelation,
        );
        permissionProfile.operatorPermissionProfiles.push(newOperatorRelation);
      }

      await this.permissionProfileRepository.save(permissionProfile);

      this.logger.info(
        `Relationships for permissionProfileId ${populatePermissionProfileDto.permissionProfileId} have been established`,
        traceId,
        'populatePermissionProfile',
        LogStreamLevel.ProdStandard,
      );

      this.logger.info(
        `Ztracking for permissionProfileId ${populatePermissionProfileDto.permissionProfileId} completed`,
        traceId,
        'populatePermissionProfile',
        LogStreamLevel.ProdStandard,
      );
    } catch (error) {
      this.logger.error(
        `Failed to populate permission profile relationships: ${error.message}`,
        traceId,
        'populatePermissionProfile',
        LogStreamLevel.ProdStandard,
      );
      throw new BadRequestException(
        'Failed to populate permission profile relationships',
      );
    }
  }
}

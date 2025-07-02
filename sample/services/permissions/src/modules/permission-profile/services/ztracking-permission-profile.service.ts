import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZtrackingPermissionProfile } from '../../../entities/ztracking-permission-profile.entity';
import { PermissionProfile } from '../../../entities/permission-profile.entity';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class ZtrackingPermissionProfileService {
  private logger = getLoggerConfig(ZtrackingPermissionProfileService.name);

  constructor(
    @InjectRepository(ZtrackingPermissionProfile)
    private ztrackingPermissionProfileRepository: Repository<ZtrackingPermissionProfile>,
  ) {
    this.logger.debug(
      `${ZtrackingPermissionProfileService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingPermissionProfileEntity(
    permissionProfile: PermissionProfile,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingPermissionProfile =
      await this.ztrackingPermissionProfileRepository.save(
        this.ztrackingPermissionProfileRepository.create({
          ...permissionProfile,
          versionDate: new Date(),
        }),
      );
    this.logger.info(
      `createZtrackingPermissionProfileEntity saved in database`,
      traceId,
      'createZtrackingPermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingPermissionProfile?.ztrackingVersion);
  }

  async findZtrackingPermissionProfileEntity(
    { permissionProfileId }: { permissionProfileId: string },
    traceId: string,
  ): Promise<ZtrackingPermissionProfile[]> {
    const ztrackingPermissionProfiles =
      await this.ztrackingPermissionProfileRepository.find({
        where: { permissionProfileId },
      });

    if (!ztrackingPermissionProfiles.length) {
      throw new NotFoundException(
        `No ztracking of permission profile existed with this id => ${permissionProfileId}`,
      );
    }

    this.logger.info(
      `ztracking permission profile entity found in database`,
      traceId,
      'findZtrackingPermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingPermissionProfiles;
  }
}

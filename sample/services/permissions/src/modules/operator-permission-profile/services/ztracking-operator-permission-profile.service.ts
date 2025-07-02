import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';

import { getLoggerConfig } from '../../../utils/common';
import { OperatorPermissionProfile } from '../../../entities/operator-permission-profile.entity';
import { ZtrackingOperatorPermissionProfile } from '../../../entities/ztracking-operator-permission-profile.entity';

@Injectable()
export class ZtrackingOperatorPermissionProfileService {
  private logger = getLoggerConfig(
    ZtrackingOperatorPermissionProfileService.name,
  );

  constructor(
    @InjectRepository(ZtrackingOperatorPermissionProfile)
    private readonly ztrackingOperatorPermissionProfileRepository: Repository<ZtrackingOperatorPermissionProfile>,
  ) {
    this.logger.debug(
      `${ZtrackingOperatorPermissionProfileService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingOperatorPermissionProfile(
    operatorPermissionProfile: OperatorPermissionProfile,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingOperatorPermissionProfile =
      await this.ztrackingOperatorPermissionProfileRepository.save(
        this.ztrackingOperatorPermissionProfileRepository.create({
          ...operatorPermissionProfile,
          versionDate: new Date(),
        }),
      );
    this.logger.info(
      `createZtrackingOperatorPermissionProfile saved in database`,
      traceId,
      'createZtrackingOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingOperatorPermissionProfile?.ztrackingVersion);
  }
}

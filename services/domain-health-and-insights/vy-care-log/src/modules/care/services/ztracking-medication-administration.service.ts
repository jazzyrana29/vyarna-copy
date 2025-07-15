import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { MedicationAdministration } from '../../../entities/medication_administration.entity';
import { ZtrackingMedicationAdministration } from '../../../entities/ztracking_medication_administration.entity';
import {
  GetZtrackingMedicationAdministrationDto,
  ZtrackingMedicationAdministrationDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingMedicationAdministrationService {
  private logger = getLoggerConfig(ZtrackingMedicationAdministrationService.name);

  constructor(
    @InjectRepository(ZtrackingMedicationAdministration)
    private readonly zRepo: Repository<ZtrackingMedicationAdministration>,
  ) {
    this.logger.debug(
      `${ZtrackingMedicationAdministrationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForMedicationAdministration(
    medAdmin: MedicationAdministration,
    traceId: string,
  ): Promise<ZtrackingMedicationAdministration> {
    const entity = await this.zRepo.save(
      this.zRepo.create({ ...medAdmin, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking medication administration saved in database`,
      traceId,
      'createZtrackingForMedicationAdministration',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForMedicationAdministration(
    getZtrackingMedicationAdministrationDto: GetZtrackingMedicationAdministrationDto,
    traceId: string,
  ): Promise<ZtrackingMedicationAdministrationDto[]> {
    const { medAdminId = '' } = getZtrackingMedicationAdministrationDto;
    const list = await this.zRepo.find({ where: { medAdminId } });

    if (!list.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${medAdminId}`,
        traceId,
        'getZtrackingForMedicationAdministration',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${medAdminId}`,
      );
    }

    this.logger.info(
      `${list.length} ztracking medication administration found in database`,
      traceId,
      'getZtrackingForMedicationAdministration',
      LogStreamLevel.ProdStandard,
    );

    return list;
  }
}

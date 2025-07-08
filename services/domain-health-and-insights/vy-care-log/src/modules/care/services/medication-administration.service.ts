import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationAdministration } from '../../../entities/medication_administration.entity';
import { ZtrackingMedicationAdministrationService } from './ztracking-medication-administration.service';
import {
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
  MedicationAdministrationDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class MedicationAdministrationService {
  private logger = getLoggerConfig(MedicationAdministrationService.name);

  constructor(
    @InjectRepository(MedicationAdministration)
    private readonly medAdminRepo: Repository<MedicationAdministration>,
    private readonly ztrackingService: ZtrackingMedicationAdministrationService,
  ) {
    this.logger.debug(
      `${MedicationAdministrationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createMedicationAdministration(
    createMedicationAdministrationDto: CreateMedicationAdministrationDto,
    traceId: string,
  ): Promise<MedicationAdministrationDto> {
    const entity = this.medAdminRepo.create(createMedicationAdministrationDto);
    await this.medAdminRepo.save(entity);
    this.logger.info(
      'MedicationAdministration created',
      traceId,
      'createMedicationAdministration',
      LogStreamLevel.ProdStandard,
    );
    await this.ztrackingService.createZtrackingForMedicationAdministration(
      entity,
      traceId,
    );
    return entity;
  }

  async getMedicationAdministrations(
    getMedicationAdministrationsDto: GetMedicationAdministrationsDto,
    traceId: string,
  ): Promise<MedicationAdministrationDto[]> {
    const { babyId } = getMedicationAdministrationsDto;
    const list = await this.medAdminRepo.find({
      where: { babyId, isDeleted: false },
    });
    this.logger.info(
      `${list.length} MedicationAdministration(s) retrieved`,
      traceId,
      'getMedicationAdministrations',
      LogStreamLevel.ProdStandard,
    );
    return list;
  }
}

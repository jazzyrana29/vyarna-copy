import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationAdministration } from '../../../entities/medication_administration.entity';
import { ZtrackingMedicationAdministrationService } from './ztracking-medication-administration.service';
import {
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
  MedicationAdministrationDto,
  ValidateCareEventTimeDto,
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

  private async validateEventTime(
    validateCareEventTimeDto: ValidateCareEventTimeDto,
  ): Promise<void> {
    const { babyId, eventTime } = validateCareEventTimeDto;
    const latest = await this.medAdminRepo.findOne({
      where: { babyId, isDeleted: false },
      order: { eventTime: 'DESC' },
    });

    if (
      latest &&
      latest.eventTime.getTime() - new Date(eventTime).getTime() >
        60 * 60 * 1000
    ) {
      throw new BadRequestException(
        'Event time cannot be more than one hour older than the latest medication administration',
      );
    }
  }

  async createMedicationAdministration(
    createMedicationAdministrationDto: CreateMedicationAdministrationDto,
    traceId: string,
  ): Promise<MedicationAdministrationDto> {
    await this.validateEventTime(createMedicationAdministrationDto);
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

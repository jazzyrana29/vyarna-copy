import { Injectable } from '@nestjs/common';
import { MedicationAdministrationService } from './medication-administration.service';
import { ZtrackingMedicationAdministrationService } from './ztracking-medication-administration.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_GET_ZTRACKING_MEDICATION_ADMINISTRATION,
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class MedicationAdministrationKafkaService {
  public serviceName = MedicationAdministrationKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly medAdminService: MedicationAdministrationService,
    private readonly ztrackingService: ZtrackingMedicationAdministrationService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${MedicationAdministrationKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createMedicationAdministration(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MEDICATION_ADMINISTRATION,
      message,
      key,
      async (value: CreateMedicationAdministrationDto, traceId: string) =>
        await this.medAdminService.createMedicationAdministration(value, traceId),
    );
  }

  async getMedicationAdministrations(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MEDICATION_ADMINISTRATIONS,
      message,
      key,
      async (value: GetMedicationAdministrationsDto, traceId: string) =>
        await this.medAdminService.getMedicationAdministrations(value, traceId),
    );
  }

  async getZtrackingMedicationAdministration(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_MEDICATION_ADMINISTRATION,
      message,
      key,
      async (value: { medAdminId?: string }, traceId: string) =>
        await this.ztrackingService.getZtrackingForMedicationAdministration(value, traceId),
    );
  }
}

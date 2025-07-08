import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateDiaperChangeDto,
  GetDiaperChangesDto,
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
  CreateTemperatureMeasurementDto,
  GetTemperatureMeasurementsDto,
  CreateSymptomReportDto,
  GetSymptomReportsDto,
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
} from 'ez-utils';

@Injectable()
export class CareLogKafkaService {
  private readonly serviceName = CareLogKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDiaperChange(
    createDiaperChangeDto: CreateDiaperChangeDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_DIAPER_CHANGE,
      createDiaperChangeDto,
      traceId,
    );
  }

  async getDiaperChanges(
    getDiaperChangesDto: GetDiaperChangesDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DIAPER_CHANGES,
      getDiaperChangesDto,
      traceId,
    );
  }

  async createMedicationAdministration(
    createMedicationAdministrationDto: CreateMedicationAdministrationDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_MEDICATION_ADMINISTRATION,
      createMedicationAdministrationDto,
      traceId,
    );
  }

  async getMedicationAdministrations(
    getMedicationAdministrationsDto: GetMedicationAdministrationsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MEDICATION_ADMINISTRATIONS,
      getMedicationAdministrationsDto,
      traceId,
    );
  }

  async createTemperatureMeasurement(
    createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_TEMPERATURE_MEASUREMENT,
      createTemperatureMeasurementDto,
      traceId,
    );
  }

  async getTemperatureMeasurements(
    getTemperatureMeasurementsDto: GetTemperatureMeasurementsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_TEMPERATURE_MEASUREMENTS,
      getTemperatureMeasurementsDto,
      traceId,
    );
  }

  async createSymptomReport(
    createSymptomReportDto: CreateSymptomReportDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SYMPTOM_REPORT,
      createSymptomReportDto,
      traceId,
    );
  }

  async getSymptomReports(
    getSymptomReportsDto: GetSymptomReportsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SYMPTOM_REPORTS,
      getSymptomReportsDto,
      traceId,
    );
  }
}

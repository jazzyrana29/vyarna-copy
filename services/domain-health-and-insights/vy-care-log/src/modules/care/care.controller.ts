import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { DiaperChangeKafkaService } from './services/diaper-change-kafka.service';
import { MedicationAdministrationKafkaService } from './services/medication-administration-kafka.service';
import { TemperatureMeasurementKafkaService } from './services/temperature-measurement-kafka.service';
import { SymptomReportKafkaService } from './services/symptom-report-kafka.service';
import {
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  KT_GET_ZTRACKING_DIAPER_CHANGE,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_GET_ZTRACKING_MEDICATION_ADMINISTRATION,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_GET_ZTRACKING_TEMPERATURE_MEASUREMENT,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
  KT_GET_ZTRACKING_SYMPTOM_REPORT,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('care')
export class DiaperChangeController {
  private logger = getLoggerConfig(DiaperChangeController.name);

  constructor(
    private readonly diaperChangeKafkaService: DiaperChangeKafkaService,
    private readonly medicationKafkaService: MedicationAdministrationKafkaService,
    private readonly temperatureKafkaService: TemperatureMeasurementKafkaService,
    private readonly symptomKafkaService: SymptomReportKafkaService,
  ) {
    this.logger.debug(
      `${DiaperChangeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  @MessagePattern(KT_CREATE_DIAPER_CHANGE)
  async createDiaperChangeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_DIAPER_CHANGE}`,
      '',
      'createDiaperChangeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.diaperChangeKafkaService.createDiaperChange(message, key);
  }

  @MessagePattern(KT_GET_DIAPER_CHANGES)
  async getDiaperChangesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DIAPER_CHANGES}`,
      '',
      'getDiaperChangesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.diaperChangeKafkaService.getDiaperChanges(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_DIAPER_CHANGE)
  async getZtrackingDiaperChangeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_DIAPER_CHANGE}`,
      '',
      'getZtrackingDiaperChangeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.diaperChangeKafkaService.getZtrackingDiaperChange(message, key);
  }

  @MessagePattern(KT_CREATE_MEDICATION_ADMINISTRATION)
  async createMedicationAdministrationWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_MEDICATION_ADMINISTRATION}`,
      '',
      'createMedicationAdministrationWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.medicationKafkaService.createMedicationAdministration(message, key);
  }

  @MessagePattern(KT_GET_MEDICATION_ADMINISTRATIONS)
  async getMedicationAdministrationsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MEDICATION_ADMINISTRATIONS}`,
      '',
      'getMedicationAdministrationsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.medicationKafkaService.getMedicationAdministrations(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_MEDICATION_ADMINISTRATION)
  async getZtrackingMedicationAdministrationWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_MEDICATION_ADMINISTRATION}`,
      '',
      'getZtrackingMedicationAdministrationWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.medicationKafkaService.getZtrackingMedicationAdministration(message, key);
  }

  @MessagePattern(KT_CREATE_TEMPERATURE_MEASUREMENT)
  async createTemperatureMeasurementWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_TEMPERATURE_MEASUREMENT}`,
      '',
      'createTemperatureMeasurementWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.temperatureKafkaService.createTemperatureMeasurement(message, key);
  }

  @MessagePattern(KT_GET_TEMPERATURE_MEASUREMENTS)
  async getTemperatureMeasurementsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_TEMPERATURE_MEASUREMENTS}`,
      '',
      'getTemperatureMeasurementsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.temperatureKafkaService.getTemperatureMeasurements(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_TEMPERATURE_MEASUREMENT)
  async getZtrackingTemperatureMeasurementWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_TEMPERATURE_MEASUREMENT}`,
      '',
      'getZtrackingTemperatureMeasurementWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.temperatureKafkaService.getZtrackingTemperatureMeasurement(message, key);
  }

  @MessagePattern(KT_CREATE_SYMPTOM_REPORT)
  async createSymptomReportWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SYMPTOM_REPORT}`,
      '',
      'createSymptomReportWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.symptomKafkaService.createSymptomReport(message, key);
  }

  @MessagePattern(KT_GET_SYMPTOM_REPORTS)
  async getSymptomReportsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SYMPTOM_REPORTS}`,
      '',
      'getSymptomReportsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.symptomKafkaService.getSymptomReports(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_SYMPTOM_REPORT)
  async getZtrackingSymptomReportWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_SYMPTOM_REPORT}`,
      '',
      'getZtrackingSymptomReportWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.symptomKafkaService.getZtrackingSymptomReport(message, key);
  }
}

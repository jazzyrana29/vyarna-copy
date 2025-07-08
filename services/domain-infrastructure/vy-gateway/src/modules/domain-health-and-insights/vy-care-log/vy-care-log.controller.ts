import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { CareLogKafkaService } from './microservices/vy-care-log-kafka.service';
import {
  CreateDiaperChangeDto,
  GetDiaperChangesDto,
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
  CreateTemperatureMeasurementDto,
  GetTemperatureMeasurementsDto,
  CreateSymptomReportDto,
  GetSymptomReportsDto,
  generateTraceId,
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
} from 'ez-utils';
import { ValidateCreateDiaperChangeDtoPipe } from './pipes/validate-create-diaper-change-dto.pipe';
import { ValidateCreateMedicationAdministrationDtoPipe } from './pipes/validate-create-medication-administration-dto.pipe';
import { ValidateCreateTemperatureMeasurementDtoPipe } from './pipes/validate-create-temperature-measurement-dto.pipe';
import { ValidateCreateSymptomReportDtoPipe } from './pipes/validate-create-symptom-report-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-care-log')
@Controller('care')
export class CareLogController {
  private logger = getLoggerConfig(CareLogController.name);

  constructor(private readonly kafkaService: CareLogKafkaService) {
    this.logger.debug(
      `${CareLogController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_DIAPER_CHANGE)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateDiaperChangeDto })
  async createDiaperChange(
    @Body(new ValidateCreateDiaperChangeDtoPipe())
    createDiaperChangeDto: CreateDiaperChangeDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createDiaperChange');
    this.logger.info('traceId generated successfully', traceId, 'createDiaperChange', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createDiaperChange(
        createDiaperChangeDto,
        traceId,
      ),
      'Diaper change logged',
      traceId,
    );
  }

  @Post(KT_GET_DIAPER_CHANGES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetDiaperChangesDto })
  async getDiaperChanges(
    @Body() getDiaperChangesDto: GetDiaperChangesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getDiaperChanges');
    this.logger.info('traceId generated successfully', traceId, 'getDiaperChanges', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getDiaperChanges(getDiaperChangesDto, traceId),
      'Diaper changes retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_MEDICATION_ADMINISTRATION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateMedicationAdministrationDto })
  async createMedicationAdministration(
    @Body(new ValidateCreateMedicationAdministrationDtoPipe())
    createMedicationAdministrationDto: CreateMedicationAdministrationDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createMedicationAdministration');
    this.logger.info('traceId generated successfully', traceId, 'createMedicationAdministration', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createMedicationAdministration(
        createMedicationAdministrationDto,
        traceId,
      ),
      'Medication administration logged',
      traceId,
    );
  }

  @Post(KT_GET_MEDICATION_ADMINISTRATIONS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetMedicationAdministrationsDto })
  async getMedicationAdministrations(
    @Body() getMedicationAdministrationsDto: GetMedicationAdministrationsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getMedicationAdministrations');
    this.logger.info('traceId generated successfully', traceId, 'getMedicationAdministrations', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getMedicationAdministrations(
        getMedicationAdministrationsDto,
        traceId,
      ),
      'Medication administrations retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_TEMPERATURE_MEASUREMENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateTemperatureMeasurementDto })
  async createTemperatureMeasurement(
    @Body(new ValidateCreateTemperatureMeasurementDtoPipe())
    createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createTemperatureMeasurement');
    this.logger.info('traceId generated successfully', traceId, 'createTemperatureMeasurement', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createTemperatureMeasurement(
        createTemperatureMeasurementDto,
        traceId,
      ),
      'Temperature measurement logged',
      traceId,
    );
  }

  @Post(KT_GET_TEMPERATURE_MEASUREMENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetTemperatureMeasurementsDto })
  async getTemperatureMeasurements(
    @Body() getTemperatureMeasurementsDto: GetTemperatureMeasurementsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getTemperatureMeasurements');
    this.logger.info('traceId generated successfully', traceId, 'getTemperatureMeasurements', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getTemperatureMeasurements(
        getTemperatureMeasurementsDto,
        traceId,
      ),
      'Temperature measurements retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_SYMPTOM_REPORT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateSymptomReportDto })
  async createSymptomReport(
    @Body(new ValidateCreateSymptomReportDtoPipe())
    createSymptomReportDto: CreateSymptomReportDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSymptomReport');
    this.logger.info('traceId generated successfully', traceId, 'createSymptomReport', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createSymptomReport(
        createSymptomReportDto,
        traceId,
      ),
      'Symptom report logged',
      traceId,
    );
  }

  @Post(KT_GET_SYMPTOM_REPORTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSymptomReportsDto })
  async getSymptomReports(
    @Body() getSymptomReportsDto: GetSymptomReportsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSymptomReports');
    this.logger.info('traceId generated successfully', traceId, 'getSymptomReports', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSymptomReports(getSymptomReportsDto, traceId),
      'Symptom reports retrieved',
      traceId,
    );
  }
}

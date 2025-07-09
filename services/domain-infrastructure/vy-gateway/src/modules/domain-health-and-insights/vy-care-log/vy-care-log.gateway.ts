import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CareLogKafkaService } from './microservices/vy-care-log-kafka.service';
import {
  generateTraceId,
  CreateDiaperChangeDto,
  GetDiaperChangesDto,
  CreateMedicationAdministrationDto,
  GetMedicationAdministrationsDto,
  CreateTemperatureMeasurementDto,
  GetTemperatureMeasurementsDto,
  CreateSymptomReportDto,
  GetSymptomReportsDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'care-log', cors: CORS_ALLOW })
export class CareLogWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(CareLogWebsocket.name);

  constructor(private readonly kafkaService: CareLogKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${CareLogWebsocket.name} initialized`,
      '',
      'afterInit',
      LogStreamLevel.DebugLight,
    );
  }

  handleConnection(socket: Socket) {
    this.logger.debug(
      `Client connected: ${socket.id}`,
      '',
      'handleConnection',
      LogStreamLevel.DebugLight,
    );
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('care-log-create-diaper-change')
  async createDiaperChange(
    @ConnectedSocket() socket: Socket,
    createDiaperChangeDto: CreateDiaperChangeDto,
  ) {
    const traceId = generateTraceId('care-log-create-diaper-change');
    try {
      const result = await this.kafkaService.createDiaperChange(
        createDiaperChangeDto,
        traceId,
      );
      socket.emit('care-log-create-diaper-change-result', result);
    } catch (e: any) {
      socket.emit('care-log-create-diaper-change-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('care-log-get-diaper-changes')
  async getDiaperChanges(
    @ConnectedSocket() socket: Socket,
    getDiaperChangesDto: GetDiaperChangesDto,
  ) {
    const traceId = generateTraceId('care-log-get-diaper-changes');
    try {
      const result = await this.kafkaService.getDiaperChanges(
        getDiaperChangesDto,
        traceId,
      );
      socket.emit('care-log-get-diaper-changes-result', result);
    } catch (e: any) {
      socket.emit('care-log-get-diaper-changes-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('care-log-create-medication-administration')
  async createMedicationAdministration(
    @ConnectedSocket() socket: Socket,
    createMedicationAdministrationDto: CreateMedicationAdministrationDto,
  ) {
    const traceId = generateTraceId('care-log-create-medication-administration');
    try {
      const result = await this.kafkaService.createMedicationAdministration(
        createMedicationAdministrationDto,
        traceId,
      );
      socket.emit('care-log-create-medication-administration-result', result);
    } catch (e: any) {
      socket.emit(
        'care-log-create-medication-administration-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('care-log-get-medication-administrations')
  async getMedicationAdministrations(
    @ConnectedSocket() socket: Socket,
    getMedicationAdministrationsDto: GetMedicationAdministrationsDto,
  ) {
    const traceId = generateTraceId('care-log-get-medication-administrations');
    try {
      const result = await this.kafkaService.getMedicationAdministrations(
        getMedicationAdministrationsDto,
        traceId,
      );
      socket.emit('care-log-get-medication-administrations-result', result);
    } catch (e: any) {
      socket.emit(
        'care-log-get-medication-administrations-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('care-log-create-temperature-measurement')
  async createTemperatureMeasurement(
    @ConnectedSocket() socket: Socket,
    createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
  ) {
    const traceId = generateTraceId('care-log-create-temperature-measurement');
    try {
      const result = await this.kafkaService.createTemperatureMeasurement(
        createTemperatureMeasurementDto,
        traceId,
      );
      socket.emit('care-log-create-temperature-measurement-result', result);
    } catch (e: any) {
      socket.emit('care-log-create-temperature-measurement-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('care-log-get-temperature-measurements')
  async getTemperatureMeasurements(
    @ConnectedSocket() socket: Socket,
    getTemperatureMeasurementsDto: GetTemperatureMeasurementsDto,
  ) {
    const traceId = generateTraceId('care-log-get-temperature-measurements');
    try {
      const result = await this.kafkaService.getTemperatureMeasurements(
        getTemperatureMeasurementsDto,
        traceId,
      );
      socket.emit('care-log-get-temperature-measurements-result', result);
    } catch (e: any) {
      socket.emit('care-log-get-temperature-measurements-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('care-log-create-symptom-report')
  async createSymptomReport(
    @ConnectedSocket() socket: Socket,
    createSymptomReportDto: CreateSymptomReportDto,
  ) {
    const traceId = generateTraceId('care-log-create-symptom-report');
    try {
      const result = await this.kafkaService.createSymptomReport(
        createSymptomReportDto,
        traceId,
      );
      socket.emit('care-log-create-symptom-report-result', result);
    } catch (e: any) {
      socket.emit('care-log-create-symptom-report-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('care-log-get-symptom-reports')
  async getSymptomReports(
    @ConnectedSocket() socket: Socket,
    getSymptomReportsDto: GetSymptomReportsDto,
  ) {
    const traceId = generateTraceId('care-log-get-symptom-reports');
    try {
      const result = await this.kafkaService.getSymptomReports(
        getSymptomReportsDto,
        traceId,
      );
      socket.emit('care-log-get-symptom-reports-result', result);
    } catch (e: any) {
      socket.emit('care-log-get-symptom-reports-error', e.message || 'Unknown error');
    }
  }
}

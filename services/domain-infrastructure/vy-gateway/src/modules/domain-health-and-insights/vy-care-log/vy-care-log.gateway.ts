import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CareLogKafkaService } from './microservices/vy-care-log-kafka.service';
import {
  generateTraceId,
  CreateDiaperChangeDto,
  GetManyDiaperChangesDto,
  CreateMedicationAdministrationDto,
  GetManyMedicationAdministrationsDto,
  CreateTemperatureMeasurementDto,
  GetManyTemperatureMeasurementsDto,
  CreateSymptomReportDto,
  GetManySymptomReportsDto,
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
  JoinRoomDto,
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
    (socket.data as any).logger = this.logger;
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinRoomDto: JoinRoomDto,
  ) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(`Socket ${socket.id} joined room ${room}`, '', 'handleJoin', LogStreamLevel.DebugLight);
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_CREATE_DIAPER_CHANGE)
  async createDiaperChange(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createDiaperChangeDto: CreateDiaperChangeDto,
  ) {
    const traceId = generateTraceId('care-log-create-diaper-change');
    try {
      const result = await this.kafkaService.createDiaperChange(
        createDiaperChangeDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_DIAPER_CHANGE}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_DIAPER_CHANGE}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_DIAPER_CHANGES)
  async getDiaperChanges(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getDiaperChangesDto: GetManyDiaperChangesDto,
  ) {
    const traceId = generateTraceId('care-log-get-diaper-changes');
    try {
      const result = await this.kafkaService.getDiaperChanges(
        getDiaperChangesDto,
        traceId,
      );
      socket.emit(`${KT_GET_DIAPER_CHANGES}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_DIAPER_CHANGES}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_MEDICATION_ADMINISTRATION)
  async createMedicationAdministration(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createMedicationAdministrationDto: CreateMedicationAdministrationDto,
  ) {
    const traceId = generateTraceId('care-log-create-medication-administration');
    try {
      const result = await this.kafkaService.createMedicationAdministration(
        createMedicationAdministrationDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_MEDICATION_ADMINISTRATION}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_MEDICATION_ADMINISTRATION}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_MEDICATION_ADMINISTRATIONS)
  async getMedicationAdministrations(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getMedicationAdministrationsDto: GetManyMedicationAdministrationsDto,
  ) {
    const traceId = generateTraceId('care-log-get-medication-administrations');
    try {
      const result = await this.kafkaService.getMedicationAdministrations(
        getMedicationAdministrationsDto,
        traceId,
      );
      socket.emit(`${KT_GET_MEDICATION_ADMINISTRATIONS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_MEDICATION_ADMINISTRATIONS}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CREATE_TEMPERATURE_MEASUREMENT)
  async createTemperatureMeasurement(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
  ) {
    const traceId = generateTraceId('care-log-create-temperature-measurement');
    try {
      const result = await this.kafkaService.createTemperatureMeasurement(
        createTemperatureMeasurementDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_TEMPERATURE_MEASUREMENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_TEMPERATURE_MEASUREMENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_TEMPERATURE_MEASUREMENTS)
  async getTemperatureMeasurements(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getTemperatureMeasurementsDto: GetManyTemperatureMeasurementsDto,
  ) {
    const traceId = generateTraceId('care-log-get-temperature-measurements');
    try {
      const result = await this.kafkaService.getTemperatureMeasurements(
        getTemperatureMeasurementsDto,
        traceId,
      );
      socket.emit(`${KT_GET_TEMPERATURE_MEASUREMENTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_TEMPERATURE_MEASUREMENTS}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_SYMPTOM_REPORT)
  async createSymptomReport(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createSymptomReportDto: CreateSymptomReportDto,
  ) {
    const traceId = generateTraceId('care-log-create-symptom-report');
    try {
      const result = await this.kafkaService.createSymptomReport(
        createSymptomReportDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_SYMPTOM_REPORT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_SYMPTOM_REPORT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_SYMPTOM_REPORTS)
  async getSymptomReports(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getSymptomReportsDto: GetManySymptomReportsDto,
  ) {
    const traceId = generateTraceId('care-log-get-symptom-reports');
    try {
      const result = await this.kafkaService.getSymptomReports(
        getSymptomReportsDto,
        traceId,
      );
      socket.emit(`${KT_GET_SYMPTOM_REPORTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_SYMPTOM_REPORTS}-error`, e.message || 'Unknown error');
    }
  }
}

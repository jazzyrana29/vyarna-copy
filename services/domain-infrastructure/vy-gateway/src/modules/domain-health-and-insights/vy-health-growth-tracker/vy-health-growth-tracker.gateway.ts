import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthGrowthTrackerKafkaService } from './microservices/vy-health-growth-tracker-kafka.service';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetOnePersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
  KT_CREATE_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  KT_GET_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'health-growth-tracker', cors: CORS_ALLOW })
export class HealthGrowthTrackerWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthGrowthTrackerWebsocket.name);

  constructor(private readonly personBabyKafka: HealthGrowthTrackerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthGrowthTrackerWebsocket.name} initialized`,
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

  @SubscribeMessage(KT_CREATE_PERSON_ENTITY)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_UPDATE_PERSON_ENTITY)
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit(`${KT_UPDATE_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_UPDATE_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_PERSON_ENTITY)
  async handleGet(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getPersonDto: GetOnePersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit(`${KT_GET_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_HISTORY_PERSON_ENTITY)
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit(`${KT_GET_HISTORY_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_HISTORY_PERSON_ENTITY}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_MANY_PERSONS)
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit(`${KT_GET_MANY_PERSONS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_MANY_PERSONS}-error`,
        e.message || 'Unknown error',
      );
    }
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonIdentityKafkaService } from './microservices/vy-person-identity-kafka.service';
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

@WebSocketGateway({ namespace: 'person-identity', cors: CORS_ALLOW })
export class PersonIdentityWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonIdentityWebsocket.name);

  constructor(private readonly personIdentityKafka: PersonIdentityKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonIdentityWebsocket.name} initialized`,
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
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-identity-create');
    try {
      const result = await this.personIdentityKafka.createPerson(
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
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-identity-update');
    try {
      const result = await this.personIdentityKafka.updatePerson(
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
    getPersonDto: GetOnePersonDto,
  ) {
    const traceId = generateTraceId('person-identity-get');
    try {
      const result = await this.personIdentityKafka.getPerson(getPersonDto, traceId);
      socket.emit(`${KT_GET_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_HISTORY_PERSON_ENTITY)
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-identity-get-history');
    try {
      const result = await this.personIdentityKafka.getHistory(
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
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-identity-get-many');
    try {
      const result = await this.personIdentityKafka.getManyPersons(
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

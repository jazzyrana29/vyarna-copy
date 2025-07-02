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
  GetPersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
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

  @SubscribeMessage('person-identity-create')
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
      socket.emit('person-identity-create-result', result);
    } catch (e: any) {
      socket.emit('person-identity-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-identity-update')
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
      socket.emit('person-identity-update-result', result);
    } catch (e: any) {
      socket.emit('person-identity-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-identity-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-identity-get');
    try {
      const result = await this.personIdentityKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-identity-get-result', result);
    } catch (e: any) {
      socket.emit('person-identity-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-identity-get-history')
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
      socket.emit('person-identity-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-identity-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-identity-get-many')
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
      socket.emit('person-identity-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-identity-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

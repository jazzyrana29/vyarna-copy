import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonFamilyGraphKafkaService } from './microservices/vy-person-family-graph-kafka.service';
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

@WebSocketGateway({ namespace: 'person-family-graph', cors: CORS_ALLOW })
export class PersonFamilyGraphWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonFamilyGraphWebsocket.name);

  constructor(private readonly personBabyKafka: PersonFamilyGraphKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonFamilyGraphWebsocket.name} initialized`,
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

  @SubscribeMessage('person-family-graph-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-family-graph-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-family-graph-create-result', result);
    } catch (e: any) {
      socket.emit('person-family-graph-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-family-graph-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-family-graph-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-family-graph-update-result', result);
    } catch (e: any) {
      socket.emit('person-family-graph-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-family-graph-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-family-graph-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-family-graph-get-result', result);
    } catch (e: any) {
      socket.emit('person-family-graph-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-family-graph-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-family-graph-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-family-graph-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-family-graph-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-family-graph-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-family-graph-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-family-graph-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-family-graph-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

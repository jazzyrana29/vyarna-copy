import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonProviderKafkaService } from './microservices/vy-person-provider-kafka.service';
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

@WebSocketGateway({ namespace: 'person-provider', cors: CORS_ALLOW })
export class PersonProviderWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonProviderWebsocket.name);

  constructor(private readonly personBabyKafka: PersonProviderKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonProviderWebsocket.name} initialized`,
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

  @SubscribeMessage('person-provider-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-provider-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-provider-create-result', result);
    } catch (e: any) {
      socket.emit('person-provider-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-provider-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-provider-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-provider-update-result', result);
    } catch (e: any) {
      socket.emit('person-provider-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-provider-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-provider-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-provider-get-result', result);
    } catch (e: any) {
      socket.emit('person-provider-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-provider-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-provider-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-provider-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-provider-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-provider-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-provider-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-provider-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-provider-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

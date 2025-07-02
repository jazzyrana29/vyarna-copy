import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonConsumerKafkaService } from './microservices/vy-person-consumer-kafka.service';
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

@WebSocketGateway({ namespace: 'person-consumer', cors: CORS_ALLOW })
export class PersonConsumerWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonConsumerWebsocket.name);

  constructor(private readonly personBabyKafka: PersonConsumerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonConsumerWebsocket.name} initialized`,
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

  @SubscribeMessage('person-consumer-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-consumer-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-consumer-create-result', result);
    } catch (e: any) {
      socket.emit('person-consumer-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-consumer-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-consumer-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-consumer-update-result', result);
    } catch (e: any) {
      socket.emit('person-consumer-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-consumer-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-consumer-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-consumer-get-result', result);
    } catch (e: any) {
      socket.emit('person-consumer-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-consumer-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-consumer-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-consumer-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-consumer-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-consumer-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-consumer-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-consumer-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-consumer-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

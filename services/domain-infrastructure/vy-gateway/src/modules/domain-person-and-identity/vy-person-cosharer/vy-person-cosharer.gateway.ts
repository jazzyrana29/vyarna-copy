import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonCosharerKafkaService } from './microservices/vy-person-cosharer-kafka.service';
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

@WebSocketGateway({ namespace: 'person-cosharer', cors: CORS_ALLOW })
export class PersonCosharerWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonCosharerWebsocket.name);

  constructor(private readonly personBabyKafka: PersonCosharerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonCosharerWebsocket.name} initialized`,
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

  @SubscribeMessage('person-cosharer-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-cosharer-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-cosharer-create-result', result);
    } catch (e: any) {
      socket.emit('person-cosharer-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-cosharer-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-cosharer-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-cosharer-update-result', result);
    } catch (e: any) {
      socket.emit('person-cosharer-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-cosharer-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-cosharer-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-cosharer-get-result', result);
    } catch (e: any) {
      socket.emit('person-cosharer-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-cosharer-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-cosharer-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-cosharer-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-cosharer-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-cosharer-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-cosharer-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-cosharer-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-cosharer-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

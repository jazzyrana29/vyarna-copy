import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonMilkGiverKafkaService } from './microservices/vy-person-milk-giver-kafka.service';
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

@WebSocketGateway({ namespace: 'person-milk-giver', cors: CORS_ALLOW })
export class PersonMilkGiverWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonMilkGiverWebsocket.name);

  constructor(private readonly personBabyKafka: PersonMilkGiverKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonMilkGiverWebsocket.name} initialized`,
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

  @SubscribeMessage('person-milk-giver-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-milk-giver-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-milk-giver-create-result', result);
    } catch (e: any) {
      socket.emit('person-milk-giver-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-milk-giver-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-milk-giver-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-milk-giver-update-result', result);
    } catch (e: any) {
      socket.emit('person-milk-giver-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-milk-giver-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-milk-giver-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-milk-giver-get-result', result);
    } catch (e: any) {
      socket.emit('person-milk-giver-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-milk-giver-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-milk-giver-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-milk-giver-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-milk-giver-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-milk-giver-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-milk-giver-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-milk-giver-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-milk-giver-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

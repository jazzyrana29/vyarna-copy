import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EmotionalEngagementKafkaService } from './microservices/vy-emotional-engagement-kafka.service';
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

@WebSocketGateway({ namespace: 'emotional-engagement', cors: CORS_ALLOW })
export class EmotionalEngagementWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(EmotionalEngagementWebsocket.name);

  constructor(private readonly personBabyKafka: EmotionalEngagementKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${EmotionalEngagementWebsocket.name} initialized`,
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

  @SubscribeMessage('emotional-engagement-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('emotional-engagement-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('emotional-engagement-create-result', result);
    } catch (e: any) {
      socket.emit('emotional-engagement-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('emotional-engagement-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('emotional-engagement-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('emotional-engagement-update-result', result);
    } catch (e: any) {
      socket.emit('emotional-engagement-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('emotional-engagement-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('emotional-engagement-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('emotional-engagement-get-result', result);
    } catch (e: any) {
      socket.emit('emotional-engagement-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('emotional-engagement-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('emotional-engagement-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('emotional-engagement-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'emotional-engagement-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('emotional-engagement-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('emotional-engagement-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('emotional-engagement-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'emotional-engagement-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

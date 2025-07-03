import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EducationFeedKafkaService } from './microservices/vy-education-feed-kafka.service';
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

@WebSocketGateway({ namespace: 'education-feed', cors: CORS_ALLOW })
export class EducationFeedWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(EducationFeedWebsocket.name);

  constructor(private readonly personBabyKafka: EducationFeedKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${EducationFeedWebsocket.name} initialized`,
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

  @SubscribeMessage('education-feed-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('education-feed-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('education-feed-create-result', result);
    } catch (e: any) {
      socket.emit('education-feed-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('education-feed-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('education-feed-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('education-feed-update-result', result);
    } catch (e: any) {
      socket.emit('education-feed-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('education-feed-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('education-feed-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('education-feed-get-result', result);
    } catch (e: any) {
      socket.emit('education-feed-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('education-feed-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('education-feed-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('education-feed-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'education-feed-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('education-feed-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('education-feed-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('education-feed-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'education-feed-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

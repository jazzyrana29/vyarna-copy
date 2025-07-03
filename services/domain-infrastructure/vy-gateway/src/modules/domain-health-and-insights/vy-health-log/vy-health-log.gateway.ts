import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthLogKafkaService } from './microservices/vy-health-log-kafka.service';
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

@WebSocketGateway({ namespace: 'health-log', cors: CORS_ALLOW })
export class HealthLogWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthLogWebsocket.name);

  constructor(private readonly personBabyKafka: HealthLogKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthLogWebsocket.name} initialized`,
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

  @SubscribeMessage('health-log-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('health-log-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('health-log-create-result', result);
    } catch (e: any) {
      socket.emit('health-log-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-log-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('health-log-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('health-log-update-result', result);
    } catch (e: any) {
      socket.emit('health-log-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-log-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('health-log-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('health-log-get-result', result);
    } catch (e: any) {
      socket.emit('health-log-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-log-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('health-log-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('health-log-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'health-log-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('health-log-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('health-log-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('health-log-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'health-log-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthSleepKafkaService } from './microservices/vy-health-sleep-kafka.service';
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

@WebSocketGateway({ namespace: 'health-sleep', cors: CORS_ALLOW })
export class HealthSleepWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthSleepWebsocket.name);

  constructor(private readonly personBabyKafka: HealthSleepKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthSleepWebsocket.name} initialized`,
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

  @SubscribeMessage('health-sleep-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('health-sleep-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('health-sleep-create-result', result);
    } catch (e: any) {
      socket.emit('health-sleep-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-sleep-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('health-sleep-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('health-sleep-update-result', result);
    } catch (e: any) {
      socket.emit('health-sleep-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-sleep-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('health-sleep-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('health-sleep-get-result', result);
    } catch (e: any) {
      socket.emit('health-sleep-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-sleep-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('health-sleep-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('health-sleep-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'health-sleep-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('health-sleep-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('health-sleep-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('health-sleep-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'health-sleep-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

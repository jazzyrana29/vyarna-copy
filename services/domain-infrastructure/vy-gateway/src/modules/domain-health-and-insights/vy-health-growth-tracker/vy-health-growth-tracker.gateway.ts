import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthGrowthTrackerKafkaService } from './microservices/vy-health-growth-tracker-kafka.service';
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

@WebSocketGateway({ namespace: 'health-growth-tracker', cors: CORS_ALLOW })
export class HealthGrowthTrackerWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthGrowthTrackerWebsocket.name);

  constructor(private readonly personBabyKafka: HealthGrowthTrackerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthGrowthTrackerWebsocket.name} initialized`,
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

  @SubscribeMessage('health-growth-tracker-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('health-growth-tracker-create-result', result);
    } catch (e: any) {
      socket.emit('health-growth-tracker-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-growth-tracker-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('health-growth-tracker-update-result', result);
    } catch (e: any) {
      socket.emit('health-growth-tracker-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-growth-tracker-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('health-growth-tracker-get-result', result);
    } catch (e: any) {
      socket.emit('health-growth-tracker-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-growth-tracker-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('health-growth-tracker-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'health-growth-tracker-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('health-growth-tracker-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('health-growth-tracker-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('health-growth-tracker-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'health-growth-tracker-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

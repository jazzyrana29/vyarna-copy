import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthCryAnalyzerKafkaService } from './microservices/vy-health-cry-analyzer-kafka.service';
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

@WebSocketGateway({ namespace: 'health-cry-analyzer', cors: CORS_ALLOW })
export class HealthCryAnalyzerWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthCryAnalyzerWebsocket.name);

  constructor(private readonly personBabyKafka: HealthCryAnalyzerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthCryAnalyzerWebsocket.name} initialized`,
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

  @SubscribeMessage('health-cry-analyzer-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('health-cry-analyzer-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('health-cry-analyzer-create-result', result);
    } catch (e: any) {
      socket.emit('health-cry-analyzer-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-cry-analyzer-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('health-cry-analyzer-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('health-cry-analyzer-update-result', result);
    } catch (e: any) {
      socket.emit('health-cry-analyzer-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-cry-analyzer-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('health-cry-analyzer-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('health-cry-analyzer-get-result', result);
    } catch (e: any) {
      socket.emit('health-cry-analyzer-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('health-cry-analyzer-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('health-cry-analyzer-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('health-cry-analyzer-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'health-cry-analyzer-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('health-cry-analyzer-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('health-cry-analyzer-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('health-cry-analyzer-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'health-cry-analyzer-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesStoreKafkaService } from './microservices/vy-sales-store-kafka.service';
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

@WebSocketGateway({ namespace: 'sales-store', cors: CORS_ALLOW })
export class SalesStoreWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(SalesStoreWebsocket.name);

  constructor(private readonly personBabyKafka: SalesStoreKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SalesStoreWebsocket.name} initialized`,
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

  @SubscribeMessage('sales-store-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('sales-store-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('sales-store-create-result', result);
    } catch (e: any) {
      socket.emit('sales-store-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-store-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('sales-store-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('sales-store-update-result', result);
    } catch (e: any) {
      socket.emit('sales-store-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-store-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('sales-store-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('sales-store-get-result', result);
    } catch (e: any) {
      socket.emit('sales-store-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-store-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('sales-store-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('sales-store-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-store-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('sales-store-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('sales-store-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('sales-store-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-store-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

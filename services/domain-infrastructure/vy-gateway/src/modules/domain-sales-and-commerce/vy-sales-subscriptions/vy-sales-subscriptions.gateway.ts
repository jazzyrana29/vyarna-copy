import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesSubscriptionsKafkaService } from './microservices/vy-sales-subscriptions-kafka.service';
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

@WebSocketGateway({ namespace: 'sales-subscriptions', cors: CORS_ALLOW })
export class SalesSubscriptionsWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(SalesSubscriptionsWebsocket.name);

  constructor(private readonly personBabyKafka: SalesSubscriptionsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SalesSubscriptionsWebsocket.name} initialized`,
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

  @SubscribeMessage('sales-subscriptions-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('sales-subscriptions-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('sales-subscriptions-create-result', result);
    } catch (e: any) {
      socket.emit('sales-subscriptions-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-subscriptions-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('sales-subscriptions-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('sales-subscriptions-update-result', result);
    } catch (e: any) {
      socket.emit('sales-subscriptions-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-subscriptions-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('sales-subscriptions-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('sales-subscriptions-get-result', result);
    } catch (e: any) {
      socket.emit('sales-subscriptions-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-subscriptions-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('sales-subscriptions-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('sales-subscriptions-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-subscriptions-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('sales-subscriptions-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('sales-subscriptions-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('sales-subscriptions-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-subscriptions-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

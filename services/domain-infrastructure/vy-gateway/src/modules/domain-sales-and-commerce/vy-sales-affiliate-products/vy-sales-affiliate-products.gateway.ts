import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesAffiliateProductsKafkaService } from './microservices/vy-sales-affiliate-products-kafka.service';
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

@WebSocketGateway({ namespace: 'sales-affiliate-products', cors: CORS_ALLOW })
export class SalesAffiliateProductsWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(SalesAffiliateProductsWebsocket.name);

  constructor(private readonly personBabyKafka: SalesAffiliateProductsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SalesAffiliateProductsWebsocket.name} initialized`,
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

  @SubscribeMessage('sales-affiliate-products-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('sales-affiliate-products-create-result', result);
    } catch (e: any) {
      socket.emit('sales-affiliate-products-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-affiliate-products-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('sales-affiliate-products-update-result', result);
    } catch (e: any) {
      socket.emit('sales-affiliate-products-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-affiliate-products-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('sales-affiliate-products-get-result', result);
    } catch (e: any) {
      socket.emit('sales-affiliate-products-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-affiliate-products-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('sales-affiliate-products-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-affiliate-products-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('sales-affiliate-products-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('sales-affiliate-products-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-affiliate-products-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

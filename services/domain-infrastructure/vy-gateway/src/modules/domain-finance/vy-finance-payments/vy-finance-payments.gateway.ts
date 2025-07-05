import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import {
  generateTraceId,
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'finance-payments', cors: CORS_ALLOW })
export class FinancePaymentsWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(FinancePaymentsWebsocket.name);

  constructor(private readonly paymentsKafka: FinancePaymentsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${FinancePaymentsWebsocket.name} initialized`,
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

  @SubscribeMessage('finance-payments-create-intent')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    dto: CreatePaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-intent');
    try {
      const result = await this.paymentsKafka.createPaymentIntent(dto, traceId);
      socket.emit('finance-payments-create-intent-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-create-intent-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-get-intent')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    dto: GetPaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-intent');
    try {
      const result = await this.paymentsKafka.getPaymentIntent(dto, traceId);
      socket.emit('finance-payments-get-intent-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-get-intent-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-get-ztracking-intent')
  async handleZtracking(
    @ConnectedSocket() socket: Socket,
    dto: GetZtrackingPaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-ztracking-intent');
    try {
      const result = await this.paymentsKafka.getZtrackingPaymentIntent(
        dto,
        traceId,
      );
      socket.emit('finance-payments-get-ztracking-intent-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-get-ztracking-intent-error',
        e.message || 'Unknown error',
      );
    }
  }
}

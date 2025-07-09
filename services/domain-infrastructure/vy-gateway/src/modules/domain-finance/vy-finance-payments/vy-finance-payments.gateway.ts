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
  CreateRefundDto,
  GetPaymentRefundDto,
  RetryPaymentAttemptDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
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
    createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-intent');
    try {
      const result = await this.paymentsKafka.createPaymentIntent(
        createPaymentIntentDto,
        traceId,
      );
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
    getPaymentIntentDto: GetPaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-intent');
    try {
      const result = await this.paymentsKafka.getPaymentIntent(
        getPaymentIntentDto,
        traceId,
      );
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
    getZtrackingPaymentIntentDto: GetZtrackingPaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-ztracking-intent');
    try {
      const result = await this.paymentsKafka.getZtrackingPaymentIntent(
        getZtrackingPaymentIntentDto,
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

  @SubscribeMessage('finance-payments-create-refund')
  async handleCreateRefund(
    @ConnectedSocket() socket: Socket,
    createRefundDto: CreateRefundDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-refund');
    try {
      const result = await this.paymentsKafka.createRefund(
        createRefundDto,
        traceId,
      );
      socket.emit('finance-payments-create-refund-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-create-refund-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-get-refund')
  async handleGetRefund(
    @ConnectedSocket() socket: Socket,
    getPaymentRefundDto: GetPaymentRefundDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-refund');
    try {
      const result = await this.paymentsKafka.getRefund(
        getPaymentRefundDto,
        traceId,
      );
      socket.emit('finance-payments-get-refund-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-get-refund-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-retry-attempt')
  async handleRetryAttempt(
    @ConnectedSocket() socket: Socket,
    retryPaymentAttemptDto: RetryPaymentAttemptDto,
  ) {
    const traceId = generateTraceId('finance-payments-retry-attempt');
    try {
      const result = await this.paymentsKafka.retryPaymentAttempt(
        retryPaymentAttemptDto,
        traceId,
      );
      socket.emit('finance-payments-retry-attempt-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-retry-attempt-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-create-method')
  async handleCreateMethod(
    @ConnectedSocket() socket: Socket,
    createPaymentMethodDto: CreatePaymentMethodDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-method');
    try {
      const result = await this.paymentsKafka.createPaymentMethod(
        createPaymentMethodDto,
        traceId,
      );
      socket.emit('finance-payments-create-method-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-create-method-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-list-methods')
  async handleListMethods(
    @ConnectedSocket() socket: Socket,
    getPaymentMethodsDto: GetPaymentMethodsDto,
  ) {
    const traceId = generateTraceId('finance-payments-list-methods');
    try {
      const result = await this.paymentsKafka.listPaymentMethods(
        getPaymentMethodsDto,
        traceId,
      );
      socket.emit('finance-payments-list-methods-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-list-methods-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-delete-method')
  async handleDeleteMethod(
    @ConnectedSocket() socket: Socket,
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ) {
    const traceId = generateTraceId('finance-payments-delete-method');
    try {
      const result = await this.paymentsKafka.deletePaymentMethod(
        deletePaymentMethodDto,
        traceId,
      );
      socket.emit('finance-payments-delete-method-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-delete-method-error',
        e.message || 'Unknown error',
      );
    }
  }
}

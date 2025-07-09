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
  CapturePaymentIntentDto,
  CreateContactDto,
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CAPTURE_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_PROCESS_STRIPE_WEBHOOK,
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
  KT_RETRY_PAYMENT_ATTEMPT,
  KT_CREATE_CONTACT,
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

  @SubscribeMessage(KT_CREATE_PAYMENT_INTENT)
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
      socket.emit(`${KT_CREATE_PAYMENT_INTENT}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_PAYMENT_INTENT}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_PAYMENT_INTENT)
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
      socket.emit(`${KT_GET_PAYMENT_INTENT}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_PAYMENT_INTENT}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_ZTRACKING_PAYMENT_INTENT)
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
      socket.emit(`${KT_GET_ZTRACKING_PAYMENT_INTENT}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_ZTRACKING_PAYMENT_INTENT}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CAPTURE_PAYMENT_INTENT)
  async handleCapture(
    @ConnectedSocket() socket: Socket,
    capturePaymentIntentDto: CapturePaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-capture-intent');
    try {
      const result = await this.paymentsKafka.capturePaymentIntent(
        capturePaymentIntentDto,
        traceId,
      );
      socket.emit(`${KT_CAPTURE_PAYMENT_INTENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CAPTURE_PAYMENT_INTENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_REFUND)
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
      socket.emit(`${KT_CREATE_REFUND}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_REFUND}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_REFUND)
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
      socket.emit(`${KT_GET_REFUND}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_REFUND}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_RETRY_PAYMENT_ATTEMPT)
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
      socket.emit(`${KT_RETRY_PAYMENT_ATTEMPT}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_RETRY_PAYMENT_ATTEMPT}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CREATE_PAYMENT_METHOD)
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
      socket.emit(`${KT_CREATE_PAYMENT_METHOD}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_PAYMENT_METHOD}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CREATE_CONTACT)
  async handleCreateContact(
    @ConnectedSocket() socket: Socket,
    createContactDto: CreateContactDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-contact');
    try {
      const result = await this.paymentsKafka.createContact(
        createContactDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_CONTACT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_CONTACT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_LIST_PAYMENT_METHODS)
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
      socket.emit(`${KT_LIST_PAYMENT_METHODS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_LIST_PAYMENT_METHODS}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_DELETE_PAYMENT_METHOD)
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
      socket.emit(`${KT_DELETE_PAYMENT_METHOD}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_DELETE_PAYMENT_METHOD}-error`,
        e.message || 'Unknown error',
      );
    }
  }
}

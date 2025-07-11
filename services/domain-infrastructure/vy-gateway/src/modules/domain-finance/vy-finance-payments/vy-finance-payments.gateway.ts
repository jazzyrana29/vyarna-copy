import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import {
  generateTraceId,
  CreatePaymentIntentPayloadDto,
  GetPaymentIntentDto,
  GetPaymentIntentStatusDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  RetryPaymentAttemptDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  CapturePaymentIntentDto,
  ConfirmPaymentIntentDto,
  CreateStripeContactDto,
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT_STATUS,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CONFIRM_PAYMENT_INTENT,
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
  private intentUserMap = new Map<string, string>();

  constructor(private readonly paymentsKafka: FinancePaymentsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${FinancePaymentsWebsocket.name} initialized`,
      '',
      'afterInit',
      LogStreamLevel.DebugLight,
    );
  }

  getUserForIntent(intentId: string): string | undefined {
    return this.intentUserMap.get(intentId);
  }

  handleConnection(socket: Socket) {
    this.logger.debug(
      `Client connected: ${socket.id}`,
      '',
      'handleConnection',
      LogStreamLevel.DebugLight,
    );
    const queryUser = socket.handshake.query['userId'];
    if (typeof queryUser === 'string' && queryUser) {
      socket.join(queryUser);
      (socket.data as any).userId = queryUser;
    } else {
      socket.on('register-user', (id: string) => {
        if (typeof id === 'string' && id) {
          socket.join(id);
          (socket.data as any).userId = id;
        }
      });
    }
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
    const userId = (socket.data as any).userId;
    if (userId) {
      for (const [intentId, uid] of this.intentUserMap.entries()) {
        if (uid === userId) {
          this.intentUserMap.delete(intentId);
        }
      }
    }
  }

  @SubscribeMessage(KT_CREATE_PAYMENT_INTENT)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createPaymentIntentDto: CreatePaymentIntentPayloadDto,
  ) {
    const traceId = generateTraceId('finance-payments-create-intent');
    try {
      const result = await this.paymentsKafka.createPaymentIntent(
        createPaymentIntentDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_PAYMENT_INTENT}-result`, result);
      if (result?.paymentIntentId && (socket.data as any).userId) {
        this.intentUserMap.set(
          result.paymentIntentId,
          (socket.data as any).userId as string,
        );
      }
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
    @MessageBody() getPaymentIntentDto: GetPaymentIntentDto,
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

  @SubscribeMessage(KT_GET_PAYMENT_INTENT_STATUS)
  async handleGetStatus(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: GetPaymentIntentStatusDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-intent-status');
    try {
      const result = await this.paymentsKafka.getPaymentIntentStatus(dto, traceId);
      socket.emit(`${KT_GET_PAYMENT_INTENT_STATUS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_PAYMENT_INTENT_STATUS}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_ZTRACKING_PAYMENT_INTENT)
  async handleZtracking(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getZtrackingPaymentIntentDto: GetZtrackingPaymentIntentDto,
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

  @SubscribeMessage(KT_CONFIRM_PAYMENT_INTENT)
  async handleConfirm(
    @ConnectedSocket() socket: Socket,
    @MessageBody() confirmDto: ConfirmPaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-confirm-intent');
    try {
      const result = await this.paymentsKafka.confirmPaymentIntent(
        confirmDto,
        traceId,
      );
      socket.emit(`${KT_CONFIRM_PAYMENT_INTENT}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CONFIRM_PAYMENT_INTENT}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CAPTURE_PAYMENT_INTENT)
  async handleCapture(
    @ConnectedSocket() socket: Socket,
    @MessageBody() capturePaymentIntentDto: CapturePaymentIntentDto,
  ) {
    const traceId = generateTraceId('finance-payments-capture-intent');
    try {
      await this.paymentsKafka.confirmPaymentIntent(capturePaymentIntentDto, traceId);
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
    @MessageBody() createRefundDto: CreateRefundDto,
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
    @MessageBody() getPaymentRefundDto: GetPaymentRefundDto,
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
    @MessageBody() retryPaymentAttemptDto: RetryPaymentAttemptDto,
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
    @MessageBody() createPaymentMethodDto: CreatePaymentMethodDto,
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
    @MessageBody() createContactDto: CreateStripeContactDto,
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
    @MessageBody() getPaymentMethodsDto: GetPaymentMethodsDto,
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
    @MessageBody() deletePaymentMethodDto: DeletePaymentMethodDto,
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

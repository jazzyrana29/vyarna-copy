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
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'finance-payments', cors: CORS_ALLOW })
export class FinancePaymentsWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(FinancePaymentsWebsocket.name);

  constructor(private readonly personBabyKafka: FinancePaymentsKafkaService) {}

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

  @SubscribeMessage('finance-payments-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('finance-payments-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('finance-payments-create-result', result);
    } catch (e: any) {
      socket.emit('finance-payments-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-payments-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('finance-payments-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('finance-payments-update-result', result);
    } catch (e: any) {
      socket.emit('finance-payments-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-payments-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('finance-payments-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('finance-payments-get-result', result);
    } catch (e: any) {
      socket.emit('finance-payments-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-payments-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('finance-payments-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-payments-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('finance-payments-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('finance-payments-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-payments-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

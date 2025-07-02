import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FinanceWalletKafkaService } from './microservices/vy-finance-wallet-kafka.service';
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

@WebSocketGateway({ namespace: 'finance-wallet', cors: CORS_ALLOW })
export class FinanceWalletWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(FinanceWalletWebsocket.name);

  constructor(private readonly personBabyKafka: FinanceWalletKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${FinanceWalletWebsocket.name} initialized`,
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

  @SubscribeMessage('finance-wallet-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('finance-wallet-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('finance-wallet-create-result', result);
    } catch (e: any) {
      socket.emit('finance-wallet-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-wallet-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('finance-wallet-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('finance-wallet-update-result', result);
    } catch (e: any) {
      socket.emit('finance-wallet-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-wallet-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('finance-wallet-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('finance-wallet-get-result', result);
    } catch (e: any) {
      socket.emit('finance-wallet-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('finance-wallet-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('finance-wallet-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('finance-wallet-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-wallet-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('finance-wallet-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('finance-wallet-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('finance-wallet-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'finance-wallet-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

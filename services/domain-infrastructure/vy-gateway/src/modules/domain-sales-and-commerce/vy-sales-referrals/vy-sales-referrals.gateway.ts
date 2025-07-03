import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesReferralsKafkaService } from './microservices/vy-sales-referrals-kafka.service';
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

@WebSocketGateway({ namespace: 'sales-referrals', cors: CORS_ALLOW })
export class SalesReferralsWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(SalesReferralsWebsocket.name);

  constructor(private readonly personBabyKafka: SalesReferralsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SalesReferralsWebsocket.name} initialized`,
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

  @SubscribeMessage('sales-referrals-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('sales-referrals-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('sales-referrals-create-result', result);
    } catch (e: any) {
      socket.emit('sales-referrals-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-referrals-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('sales-referrals-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('sales-referrals-update-result', result);
    } catch (e: any) {
      socket.emit('sales-referrals-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-referrals-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('sales-referrals-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('sales-referrals-get-result', result);
    } catch (e: any) {
      socket.emit('sales-referrals-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-referrals-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('sales-referrals-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('sales-referrals-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-referrals-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('sales-referrals-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('sales-referrals-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('sales-referrals-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'sales-referrals-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

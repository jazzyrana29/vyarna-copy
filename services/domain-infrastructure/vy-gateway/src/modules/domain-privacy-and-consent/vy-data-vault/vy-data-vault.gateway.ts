import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DataVaultKafkaService } from './microservices/vy-data-vault-kafka.service';
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

@WebSocketGateway({ namespace: 'data-vault', cors: CORS_ALLOW })
export class DataVaultWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(DataVaultWebsocket.name);

  constructor(private readonly personBabyKafka: DataVaultKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${DataVaultWebsocket.name} initialized`,
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

  @SubscribeMessage('data-vault-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('data-vault-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('data-vault-create-result', result);
    } catch (e: any) {
      socket.emit('data-vault-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('data-vault-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('data-vault-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('data-vault-update-result', result);
    } catch (e: any) {
      socket.emit('data-vault-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('data-vault-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('data-vault-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('data-vault-get-result', result);
    } catch (e: any) {
      socket.emit('data-vault-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('data-vault-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('data-vault-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('data-vault-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'data-vault-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('data-vault-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('data-vault-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('data-vault-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'data-vault-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

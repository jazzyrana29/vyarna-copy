import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesAffiliateProductsKafkaService } from './microservices/vy-sales-affiliate-products-kafka.service';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetOnePersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
  KT_CREATE_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  KT_GET_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
  JoinRoomDto,
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
    (socket.data as any).logger = this.logger;
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinRoomDto: JoinRoomDto,
  ) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(`Socket ${socket.id} joined room ${room}`, '', 'handleJoin', LogStreamLevel.DebugLight);
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_CREATE_PERSON_ENTITY)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_UPDATE_PERSON_ENTITY)
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit(`${KT_UPDATE_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_UPDATE_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_PERSON_ENTITY)
  async handleGet(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getPersonDto: GetOnePersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit(`${KT_GET_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_PERSON_ENTITY}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_HISTORY_PERSON_ENTITY)
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit(`${KT_GET_HISTORY_PERSON_ENTITY}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_HISTORY_PERSON_ENTITY}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_MANY_PERSONS)
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('sales-affiliate-products-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit(`${KT_GET_MANY_PERSONS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_MANY_PERSONS}-error`,
        e.message || 'Unknown error',
      );
    }
  }
}

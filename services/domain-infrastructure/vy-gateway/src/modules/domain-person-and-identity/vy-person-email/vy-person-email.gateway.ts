import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonEmailKafkaService } from './microservices/vy-person-email-kafka.service';
import {
  generateTraceId,
  CreateEmailDto,
  UpdateEmailDto,
  GetOneEmailDto,
  GetZtrackingEmailDto,
  KT_CREATE_EMAIL,
  KT_UPDATE_EMAIL,
  KT_GET_EMAIL,
  KT_GET_ZTRACKING_EMAIL,
  JoinRoomDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-email', cors: CORS_ALLOW })
export class PersonEmailWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonEmailWebsocket.name);

  constructor(private readonly emailKafka: PersonEmailKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonEmailWebsocket.name} initialized`,
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

  @SubscribeMessage(KT_CREATE_EMAIL)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createEmailDto: CreateEmailDto,
  ) {
    const traceId = generateTraceId('person-email-create');
    try {
      const result = await this.emailKafka.createEmail(createEmailDto, traceId);
      socket.emit(`${KT_CREATE_EMAIL}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_EMAIL}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_UPDATE_EMAIL)
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() updateEmailDto: UpdateEmailDto,
  ) {
    const traceId = generateTraceId('person-email-update');
    try {
      const result = await this.emailKafka.updateEmail(updateEmailDto, traceId);
      socket.emit(`${KT_UPDATE_EMAIL}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_UPDATE_EMAIL}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_EMAIL)
  async handleGet(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getEmailDto: GetOneEmailDto,
  ) {
    const traceId = generateTraceId('person-email-get');
    try {
      const result = await this.emailKafka.getEmail(getEmailDto, traceId);
      socket.emit(`${KT_GET_EMAIL}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_EMAIL}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_ZTRACKING_EMAIL)
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getZtrackingEmailDto: GetZtrackingEmailDto,
  ) {
    const traceId = generateTraceId('person-email-get-history');
    try {
      const result = await this.emailKafka.getHistory(
        getZtrackingEmailDto,
        traceId,
      );
      socket.emit(`${KT_GET_ZTRACKING_EMAIL}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_ZTRACKING_EMAIL}-error`, e.message || 'Unknown error');
    }
  }
}

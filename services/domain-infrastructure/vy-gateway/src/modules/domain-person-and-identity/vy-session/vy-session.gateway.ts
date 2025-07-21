import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonSessionKafkaService } from './microservices/vy-session-kafka.service';
import {
  generateTraceId,
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
  LoginSessionDto,
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  KT_LOGIN_SESSION,
  JoinRoomDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-session', cors: CORS_ALLOW })
export class PersonSessionWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonSessionWebsocket.name);

  constructor(private readonly sessionKafka: PersonSessionKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonSessionWebsocket.name} initialized`,
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
  handleJoin(@ConnectedSocket() socket: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(`Socket ${socket.id} joined room ${room}`, '', 'handleJoin', LogStreamLevel.DebugLight);
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_CREATE_SESSION)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: CreateSessionDto,
  ) {
    const traceId = generateTraceId('person-session-create');
    try {
      const result = await this.sessionKafka.createSession(dto, traceId);
      socket.emit(`${KT_CREATE_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_UPDATE_SESSION)
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: UpdateSessionDto,
  ) {
    const traceId = generateTraceId('person-session-update');
    try {
      const result = await this.sessionKafka.updateSession(dto, traceId);
      socket.emit(`${KT_UPDATE_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_UPDATE_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_SESSION)
  async handleGet(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: GetOneSessionDto,
  ) {
    const traceId = generateTraceId('person-session-get');
    try {
      const result = await this.sessionKafka.getSession(dto, traceId);
      socket.emit(`${KT_GET_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_DELETE_SESSION)
  async handleDelete(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: DeleteSessionDto,
  ) {
    const traceId = generateTraceId('person-session-delete');
    try {
      const result = await this.sessionKafka.deleteSession(dto, traceId);
      socket.emit(`${KT_DELETE_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_DELETE_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_LOGIN_SESSION)
  async handleLogin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: LoginSessionDto,
  ) {
    const traceId = generateTraceId('person-session-login');
    try {
      const result = await this.sessionKafka.loginSession(dto, traceId);
      socket.emit(`${KT_LOGIN_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_LOGIN_SESSION}-error`, e.message || 'Unknown error');
    }
  }
}

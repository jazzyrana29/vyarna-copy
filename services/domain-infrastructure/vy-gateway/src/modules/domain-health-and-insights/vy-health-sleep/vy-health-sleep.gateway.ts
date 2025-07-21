import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthSleepKafkaService } from './microservices/vy-health-sleep-kafka.service';
import {
  generateTraceId,
  CreateSleepSessionDto,
  SleepEventDto,
  KT_CREATE_SLEEP_SESSION,
  KT_LOG_SLEEP_EVENT,
  JoinRoomDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'health-sleep', cors: CORS_ALLOW })
export class HealthSleepWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(HealthSleepWebsocket.name);

  constructor(private readonly kafkaService: HealthSleepKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${HealthSleepWebsocket.name} initialized`,
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

  @SubscribeMessage(KT_CREATE_SLEEP_SESSION)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createSleepSessionDto: CreateSleepSessionDto,
  ) {
    const traceId = generateTraceId('sleep-create');
    try {
      const result = await this.kafkaService.createSleepSession(
        createSleepSessionDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_SLEEP_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_SLEEP_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_LOG_SLEEP_EVENT)
  async handleEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() sleepEventData: { sessionId: string; event: SleepEventDto },
  ) {
    const traceId = generateTraceId('sleep-event');
    try {
      const dto: SleepEventDto = {
        ...sleepEventData.event,
        sessionId: sleepEventData.sessionId,
      } as any;
      const result = await this.kafkaService.logSleepEvent(dto, traceId);
      socket.emit(`${KT_LOG_SLEEP_EVENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_LOG_SLEEP_EVENT}-error`, e.message || 'Unknown error');
    }
  }
}

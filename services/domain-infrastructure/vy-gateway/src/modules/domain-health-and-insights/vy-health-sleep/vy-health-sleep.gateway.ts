import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HealthSleepKafkaService } from './microservices/vy-health-sleep-kafka.service';
import {
  generateTraceId,
  CreateSleepSessionDto,
  SleepEventDto,
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
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('sleep-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createSleepSessionDto: CreateSleepSessionDto,
  ) {
    const traceId = generateTraceId('sleep-create');
    try {
      const result = await this.kafkaService.createSleepSession(
        createSleepSessionDto,
        traceId,
      );
      socket.emit('sleep-create-result', result);
    } catch (e: any) {
      socket.emit('sleep-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sleep-event')
  async handleEvent(
    @ConnectedSocket() socket: Socket,
    sleepEventData: { sessionId: string; event: SleepEventDto },
  ) {
    const traceId = generateTraceId('sleep-event');
    try {
      const result = await this.kafkaService.logSleepEvent(
        sleepEventData.sessionId,
        sleepEventData.event,
        traceId,
      );
      socket.emit('sleep-event-result', result);
    } catch (e: any) {
      socket.emit('sleep-event-error', e.message || 'Unknown error');
    }
  }
}

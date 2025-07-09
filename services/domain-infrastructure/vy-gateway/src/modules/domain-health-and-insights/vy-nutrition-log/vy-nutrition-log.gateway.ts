import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NutritionLogKafkaService } from './microservices/vy-nutrition-log-kafka.service';
import {
  generateTraceId,
  StartNutritionSessionDto,
  GetNutritionSessionDto,
  NutritionEventDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'nutrition-log', cors: CORS_ALLOW })
export class NutritionLogWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(NutritionLogWebsocket.name);

  constructor(private readonly kafkaService: NutritionLogKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${NutritionLogWebsocket.name} initialized`,
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

  @SubscribeMessage('nutrition-log-start-session')
  async startSession(
    @ConnectedSocket() socket: Socket,
    startNutritionSessionDto: StartNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-start-session');
    try {
      const result = await this.kafkaService.startSession(
        startNutritionSessionDto,
        traceId,
      );
      socket.emit('nutrition-log-start-session-result', result);
    } catch (e: any) {
      socket.emit('nutrition-log-start-session-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('nutrition-log-log-event')
  async logEvent(
    @ConnectedSocket() socket: Socket,
    nutritionEventDto: NutritionEventDto,
  ) {
    const traceId = generateTraceId('nutrition-log-log-event');
    try {
      const result = await this.kafkaService.logEvent(
        nutritionEventDto,
        traceId,
      );
      socket.emit('nutrition-log-log-event-result', result);
    } catch (e: any) {
      socket.emit('nutrition-log-log-event-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('nutrition-log-end-session')
  async endSession(
    @ConnectedSocket() socket: Socket,
    getNutritionSessionDto: GetNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-end-session');
    try {
      const result = await this.kafkaService.endSession(
        getNutritionSessionDto,
        traceId,
      );
      socket.emit('nutrition-log-end-session-result', result);
    } catch (e: any) {
      socket.emit('nutrition-log-end-session-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('nutrition-log-get-session')
  async getSession(
    @ConnectedSocket() socket: Socket,
    getNutritionSessionDto: GetNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-get-session');
    try {
      const result = await this.kafkaService.getSession(
        getNutritionSessionDto,
        traceId,
      );
      socket.emit('nutrition-log-get-session-result', result);
    } catch (e: any) {
      socket.emit('nutrition-log-get-session-error', e.message || 'Unknown error');
    }
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NutritionLogKafkaService } from './microservices/vy-nutrition-log-kafka.service';
import {
  generateTraceId,
  CreateNutritionSessionDto,
  GetOneNutritionSessionDto,
  NutritionEventDto,
  KT_START_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
  KT_END_NUTRITION_SESSION,
  KT_LOG_NUTRITION_EVENT,
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

  @SubscribeMessage(KT_START_NUTRITION_SESSION)
  async startSession(
    @ConnectedSocket() socket: Socket,
    @MessageBody() startNutritionSessionDto: CreateNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-start-session');
    try {
      const result = await this.kafkaService.startSession(
        startNutritionSessionDto,
        traceId,
      );
      socket.emit(`${KT_START_NUTRITION_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_START_NUTRITION_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_LOG_NUTRITION_EVENT)
  async logEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() nutritionEventDto: NutritionEventDto,
  ) {
    const traceId = generateTraceId('nutrition-log-log-event');
    try {
      const result = await this.kafkaService.logEvent(
        nutritionEventDto,
        traceId,
      );
      socket.emit(`${KT_LOG_NUTRITION_EVENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_LOG_NUTRITION_EVENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_END_NUTRITION_SESSION)
  async endSession(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getNutritionSessionDto: GetOneNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-end-session');
    try {
      const result = await this.kafkaService.endSession(
        getNutritionSessionDto,
        traceId,
      );
      socket.emit(`${KT_END_NUTRITION_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_END_NUTRITION_SESSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_NUTRITION_SESSION)
  async getSession(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getNutritionSessionDto: GetOneNutritionSessionDto,
  ) {
    const traceId = generateTraceId('nutrition-log-get-session');
    try {
      const result = await this.kafkaService.getSession(
        getNutritionSessionDto,
        traceId,
      );
      socket.emit(`${KT_GET_NUTRITION_SESSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_NUTRITION_SESSION}-error`, e.message || 'Unknown error');
    }
  }
}

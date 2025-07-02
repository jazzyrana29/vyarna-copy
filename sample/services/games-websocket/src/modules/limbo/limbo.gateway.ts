import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LimboKafkaService } from './limbo-kafka.service';
import {
  generateTraceId,
  LimboStartGameDto,
  LimboCashoutDto,
  LimboConfigRequestDto,
  LimboProvablyFairRequestDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'limbo', cors: CORS_ALLOW })
export class LimboGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(LimboGateway.name);

  constructor(private readonly limboKafka: LimboKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${LimboGateway.name} initialized`,
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

  @SubscribeMessage('limbo-start')
  async handleLimboStart(
    @MessageBody() limboStartGameDto: LimboStartGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('limbo-start');
    try {
      const result = await this.limboKafka.startGame(
        limboStartGameDto,
        traceId,
      );
      socket.emit('limbo-start-result', result);
    } catch (e: any) {
      socket.emit('limbo-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('limbo-cashout')
  async handleLimboCashout(
    @MessageBody() limboCashoutDto: LimboCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('limbo-cashout');
    try {
      const result = await this.limboKafka.cashout(limboCashoutDto, traceId);
      socket.emit('limbo-cashout-result', result);
    } catch (e: any) {
      socket.emit('limbo-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('limbo-config')
  async handleLimboConfig(
    @MessageBody() limboConfigRequestDto: LimboConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('limbo-config');
    try {
      const result = await this.limboKafka.config(
        limboConfigRequestDto,
        traceId,
      );
      socket.emit('limbo-config-result', result);
    } catch (e: any) {
      socket.emit('limbo-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('limbo-provablyFair')
  async handleLimboProvablyFair(
    @MessageBody() limboProvablyFairRequestDto: LimboProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('limbo-provablyFair');
    try {
      const result = await this.limboKafka.provablyFair(
        limboProvablyFairRequestDto,
        traceId,
      );
      socket.emit('limbo-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('limbo-provablyFair-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

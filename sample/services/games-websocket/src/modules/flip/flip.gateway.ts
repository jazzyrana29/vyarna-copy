import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { FlipKafkaService } from './flip-kafka.service';
import { Server, Socket } from 'socket.io';
import {
  StartFlipDto,
  FlipDto,
  FlipCashoutDto,
  FlipProvablyFairRequestDto,
  FlipConfigRequestDto,
  generateTraceId,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'flip', cors: CORS_ALLOW })
export class FlipGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger = getLoggerConfig(FlipGateway.name);
  constructor(private readonly flipKafka: FlipKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${FlipGateway.name} initialized`,
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

  @SubscribeMessage('flip-start')
  async handleFlipStart(
    @MessageBody() startFlipDto: StartFlipDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('flip-start');
    try {
      const result = await this.flipKafka.startGame(startFlipDto, traceId);
      socket.emit('flip-start-result', result);
    } catch (e: any) {
      socket.emit('flip-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('flip-flip')
  async handleFlip(
    @MessageBody() flipDto: FlipDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('flip-flip');
    try {
      const result = await this.flipKafka.executeFlip(flipDto, traceId);
      socket.emit('flip-flip-result', result);
    } catch (e: any) {
      socket.emit('flip-flip-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('flip-cashout')
  async handleCashout(
    @MessageBody() flipCashoutDto: FlipCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('flip-cashout');
    try {
      const result = await this.flipKafka.cashout(flipCashoutDto, traceId);
      socket.emit('flip-cashout-result', result);
    } catch (e: any) {
      socket.emit('flip-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('flip-config')
  async handleConfig(
    @MessageBody() flipConfigRequestDto: FlipConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('flip-config');
    try {
      const result = await this.flipKafka.config(flipConfigRequestDto, traceId);
      socket.emit('flip-config-result', result);
    } catch (e: any) {
      socket.emit('flip-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('flip-provablyFair')
  async handleProvablyFair(
    @MessageBody() flipProvablyFairRequestDto: FlipProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('flip-provablyFair');
    try {
      const result = await this.flipKafka.provablyFair(
        flipProvablyFairRequestDto,
        traceId,
      );
      socket.emit('flip-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('flip-provablyFair-error', e.message || 'Unknown error');
    }
  }
}

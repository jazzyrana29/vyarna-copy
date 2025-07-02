import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getLoggerConfig, CORS_ALLOW } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { DartsKafkaService } from './darts-kafka.service';
import {
  generateTraceId,
  StartDartsGameDto,
  StartDartsBatchDto,
  ThrowDartDto,
  CashoutDartsGameDto,
  DartsConfigRequestDto,
} from 'ez-utils';

@WebSocketGateway({ namespace: 'darts', cors: CORS_ALLOW })
export class DartsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(DartsGateway.name);

  constructor(private readonly dartsKafkaService: DartsKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${DartsGateway.name} initialized`,
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

  @SubscribeMessage('darts-start')
  async handleDartsStartGame(
    @MessageBody() startDartsGameDto: StartDartsGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-start');
    try {
      const result = await this.dartsKafkaService.startGame(
        startDartsGameDto,
        traceId,
      );
      socket.emit('darts-start-result', result);
    } catch (e: any) {
      socket.emit('darts-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('darts-start-batch')
  async handleDartsStartBatch(
    @MessageBody() dto: StartDartsBatchDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-start-batch');
    try {
      const result = await this.dartsKafkaService.startBatch(dto, traceId);
      socket.emit('darts-start-batch-result', result);
    } catch (e: any) {
      socket.emit('darts-start-batch-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('darts-throw')
  async handleDartsThrow(
    @MessageBody() throwDartDto: ThrowDartDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-throw');
    try {
      const result = await this.dartsKafkaService.throwDart(
        throwDartDto,
        traceId,
      );
      socket.emit('darts-throw-result', result);
    } catch (e: any) {
      socket.emit('darts-throw-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('darts-cashout')
  async handleCashout(
    @MessageBody() cashoutDartsGameDto: CashoutDartsGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-cashout');
    try {
      const result = await this.dartsKafkaService.cashout(
        cashoutDartsGameDto,
        traceId,
      );
      socket.emit('darts-cashout-result', result);
    } catch (e: any) {
      socket.emit('darts-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('darts-config')
  async handleConfig(
    @MessageBody() dartsConfigRequestDto: DartsConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-config');
    try {
      const result = await this.dartsKafkaService.config(
        dartsConfigRequestDto,
        traceId,
      );
      socket.emit('darts-config-result', result);
    } catch (e: any) {
      socket.emit('darts-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('darts-provablyFair')
  async handleProvablyFair(
    @MessageBody() cashoutDartsGameDto: CashoutDartsGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('darts-provablyFair');
    try {
      const result = await this.dartsKafkaService.provablyFair(
        cashoutDartsGameDto,
        traceId,
      );
      socket.emit('darts-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('darts-provablyFair-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CrashKafkaService } from './crash-kafka.service';
import {
  StartCrashDto,
  CrashConfigRequestDto,
  CrashProvablyFairRequestDto,
  CashoutCrashGameDto,
} from 'ez-utils';
import { generateTraceId } from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'crash', cors: CORS_ALLOW })
export class CrashGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger = getLoggerConfig(CrashGateway.name);

  constructor(private readonly crashKafka: CrashKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${CrashGateway.name} initialized`,
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

  @SubscribeMessage('crash-start')
  async handleCrashStart(
    @MessageBody() startCrashDto: StartCrashDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('crash-start');
    try {
      const result = await this.crashKafka.startGame(startCrashDto, traceId);
      socket.emit('crash-start-result', result);
    } catch (e: any) {
      socket.emit('crash-start-error', e?.message || 'error');
    }
  }

  @SubscribeMessage('crash-cashout')
  async handleCrashCashout(
    @MessageBody() cashoutCrashDto: CashoutCrashGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('crash-cashout');
    try {
      const result = await this.crashKafka.cashout(cashoutCrashDto, traceId);
      socket.emit('crash-cashout-result', result);
    } catch (e: any) {
      socket.emit('crash-cashout-error', e?.message || 'error');
    }
  }

  @SubscribeMessage('crash-config')
  async handleConfig(
    @MessageBody() crashConfigRequestDto: CrashConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('crash-config');
    try {
      const config = await this.crashKafka.config(
        crashConfigRequestDto,
        traceId,
      );
      socket.emit('crash-config-result', config);
    } catch (e: any) {
      socket.emit('crash-config-error', e?.message || 'error');
    }
  }

  @SubscribeMessage('crash-provablyFair')
  async handleProvablyFair(
    @MessageBody() crashProvablyFairRequestDto: CrashProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('crash-provablyFair');
    try {
      const proof = await this.crashKafka.provablyFair(
        crashProvablyFairRequestDto,
        traceId,
      );
      socket.emit('crash-provablyFair-result', proof);
    } catch (e: any) {
      socket.emit('crash-provablyFair-error', e?.message || 'error');
    }
  }
}

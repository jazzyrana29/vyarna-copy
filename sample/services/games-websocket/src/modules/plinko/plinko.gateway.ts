import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlinkoKafkaService } from './plinko-kafka.service';
import {
  CashoutPlinkoDto,
  DropPlinkoDto,
  PlinkoConfigRequestDto,
  PlinkoProvablyFairRequestDto,
  StartPlinkoDto,
  generateTraceId,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'plinko', cors: CORS_ALLOW })
export class PlinkoGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PlinkoGateway.name);

  constructor(private readonly plinkoKafka: PlinkoKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PlinkoGateway.name} initialized`,
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

  @SubscribeMessage('plinko-start')
  async handlePlinkoStart(
    @MessageBody() startPlinkoDto: StartPlinkoDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('plinko-start');
    try {
      const result = await this.plinkoKafka.startGame(startPlinkoDto, traceId);
      socket.emit('plinko-start-result', result);
    } catch (e: any) {
      socket.emit('plinko-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('plinko-drop')
  async handlePlinkoDrop(
    @MessageBody() dropPlinkoDto: DropPlinkoDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('plinko-drop');
    try {
      const result = await this.plinkoKafka.drop(dropPlinkoDto, traceId);
      socket.emit('plinko-drop-result', result);
    } catch (e: any) {
      socket.emit('plinko-drop-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('plinko-config')
  async handlePlinkoConfig(
    @MessageBody() plinkoConfigRequestDto: PlinkoConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('plinko-config');
    try {
      const result = await this.plinkoKafka.config(
        plinkoConfigRequestDto,
        traceId,
      );
      socket.emit('plinko-config-result', result);
    } catch (e: any) {
      socket.emit('plinko-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('plinko-cashout')
  async handlePlinkoCashout(
    @MessageBody() cashoutPlinkoDto: CashoutPlinkoDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('plinko-cashout');
    try {
      const result = await this.plinkoKafka.cashout(cashoutPlinkoDto, traceId);
      socket.emit('plinko-cashout-result', result);
    } catch (e: any) {
      socket.emit('plinko-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('plinko-provablyFair')
  async handlePlinkoProvablyFair(
    @MessageBody() plinkoProvablyFairDto: PlinkoProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('plinko-provablyFair');
    try {
      const result = await this.plinkoKafka.provablyFair(
        plinkoProvablyFairDto,
        traceId,
      );
      socket.emit('plinko-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('plinko-provablyFair-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

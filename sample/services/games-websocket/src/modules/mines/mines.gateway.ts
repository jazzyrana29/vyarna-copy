import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MinesKafkaService } from './mines-kafka.service';
import {
  generateTraceId,
  MinesCashoutDto,
  MinesConfigRequestDto,
  MinesRevealTileDto,
  MinesStartGameDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'mines', cors: CORS_ALLOW })
export class MinesGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = getLoggerConfig(MinesGateway.name);

  constructor(private readonly minesKafkaService: MinesKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${MinesGateway.name} initialized`,
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

  @SubscribeMessage('mines-start')
  async handleMinesStartGame(
    @MessageBody() minesStartGameDto: MinesStartGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('mines-start');
    try {
      const result = await this.minesKafkaService.startGame(
        minesStartGameDto,
        traceId,
      );
      socket.emit('mines-start-result', result);
    } catch (e: any) {
      socket.emit('mines-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('mines-revealTile')
  async handleMinesRevealTile(
    @MessageBody() minesRevealTileDto: MinesRevealTileDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('mines-revealTile');
    try {
      const result = await this.minesKafkaService.revealTile(
        minesRevealTileDto,
        traceId,
      );
      socket.emit('mines-revealTile-result', result);
    } catch (e: any) {
      socket.emit('mines-revealTile-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('mines-cashout')
  async handleCashout(
    @MessageBody() minesCashoutDto: MinesCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('mines-cashout');
    try {
      const result = await this.minesKafkaService.cashout(
        minesCashoutDto,
        traceId,
      );
      socket.emit('mines-cashout-result', result);
    } catch (e: any) {
      socket.emit('mines-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('mines-config')
  async handleConfig(
    @MessageBody() minesConfigRequestDto: MinesConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('mines-config');
    try {
      const result = await this.minesKafkaService.getConfig(
        minesConfigRequestDto,
        traceId,
      );
      socket.emit('mines-config-result', result);
    } catch (e: any) {
      socket.emit('mines-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('mines-provablyFair')
  async handleProvablyFair(
    @MessageBody() minesCashoutDto: MinesCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('mines-provablyFair');
    try {
      const result = await this.minesKafkaService.getProvablyFair(
        minesCashoutDto,
        traceId,
      );
      socket.emit('mines-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('mines-provablyFair-error', e.message || 'Unknown error');
    }
  }
}

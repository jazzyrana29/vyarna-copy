import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DragonTowerKafkaService } from './dragon-tower-kafka.service';
import {
  generateTraceId,
  DragonTowerStartGameDto,
  DragonTowerRevealTileDto,
  DragonTowerCashoutDto,
  DragonTowerConfigRequestDto,
  DragonTowerProvablyFairRequestDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'dragon-tower', cors: CORS_ALLOW })
export class DragonTowerGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger = getLoggerConfig(DragonTowerGateway.name);

  constructor(private readonly dragonKafka: DragonTowerKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${DragonTowerGateway.name} initialized`,
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

  @SubscribeMessage('dragonTower-start')
  async handleDragonTowerStart(
    @MessageBody() dragonTowerStartGameDto: DragonTowerStartGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dragonTower-start');
    try {
      const result = await this.dragonKafka.startGame(
        dragonTowerStartGameDto,
        traceId,
      );
      socket.emit('dragonTower-start-result', result);
    } catch (e: any) {
      socket.emit('dragonTower-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dragonTower-revealTile')
  async handleDragonTowerReveal(
    @MessageBody() dragonTowerRevealTileDto: DragonTowerRevealTileDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dragonTower-revealTile');
    try {
      const result = await this.dragonKafka.reveal(
        dragonTowerRevealTileDto,
        traceId,
      );
      socket.emit('dragonTower-revealTile-result', result);
    } catch (e: any) {
      socket.emit('dragonTower-revealTile-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dragonTower-cashout')
  async handleDragonTowerCashout(
    @MessageBody() dragonTowerCashoutDto: DragonTowerCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dragonTower-cashout');
    try {
      const result = await this.dragonKafka.cashout(
        dragonTowerCashoutDto,
        traceId,
      );
      socket.emit('dragonTower-cashout-result', result);
    } catch (e: any) {
      socket.emit('dragonTower-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dragonTower-config')
  async handleConfig(
    @MessageBody() dragonTowerConfigRequestDto: DragonTowerConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dragonTower-config');
    try {
      const result = await this.dragonKafka.config(
        dragonTowerConfigRequestDto,
        traceId,
      );
      socket.emit('dragonTower-config-result', result);
    } catch (e: any) {
      socket.emit('dragonTower-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dragonTower-provablyFair')
  async handleProvablyFair(
    @MessageBody()
    dragonTowerProvablyFairRequestDto: DragonTowerProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dragonTower-provablyFair');
    try {
      const result = await this.dragonKafka.provablyFair(
        dragonTowerProvablyFairRequestDto,
        traceId,
      );
      socket.emit('dragonTower-provablyFair-result', result);
    } catch (e: any) {
      socket.emit(
        'dragonTower-provablyFair-error',
        e.message || 'Unknown error',
      );
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

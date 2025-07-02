import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SnakesKafkaService } from './snakes-kafka.service';
import {
  generateTraceId,
  CreateSnakesRoundDto,
  UpdateSnakesRoundDto,
  GetSnakesRoundDto,
  SnakesConfigRequestDto,
  SnakesProvablyFairRequestDto,
  SnakesRollDiceDto,
  SnakesCashoutDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'snakes', cors: CORS_ALLOW })
export class SnakesGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger = getLoggerConfig(SnakesGateway.name);

  constructor(private readonly snakesKafka: SnakesKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SnakesGateway.name} initialized`,
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

  @SubscribeMessage('snakes-createRound')
  async handleCreateRound(
    @MessageBody() createSnakesRoundDto: CreateSnakesRoundDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-createRound');
    try {
      const result = await this.snakesKafka.createRound(
        createSnakesRoundDto,
        traceId,
      );
      socket.emit('snakes-createRound-result', result);
    } catch (e: any) {
      socket.emit('snakes-createRound-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-updateRound')
  async handleUpdateRound(
    @MessageBody() updateSnakesRoundDto: UpdateSnakesRoundDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-updateRound');
    try {
      const result = await this.snakesKafka.updateRound(
        updateSnakesRoundDto,
        traceId,
      );
      socket.emit('snakes-updateRound-result', result);
    } catch (e: any) {
      socket.emit('snakes-updateRound-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-getRound')
  async handleGetRound(
    @MessageBody() getSnakesRoundDto: GetSnakesRoundDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-getRound');
    try {
      const result = await this.snakesKafka.getRound(
        getSnakesRoundDto,
        traceId,
      );
      socket.emit('snakes-getRound-result', result);
    } catch (e: any) {
      socket.emit('snakes-getRound-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-config')
  async handleConfig(
    @MessageBody() snakesConfigRequestDto: SnakesConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-config');
    try {
      const result = await this.snakesKafka.getConfig(
        snakesConfigRequestDto,
        traceId,
      );
      socket.emit('snakes-config-result', result);
    } catch (e: any) {
      socket.emit('snakes-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-provablyFair')
  async handleProvablyFair(
    @MessageBody() snakesProvablyFairRequestDto: SnakesProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-provablyFair');
    try {
      const result = await this.snakesKafka.getProvablyFair(
        snakesProvablyFairRequestDto,
        traceId,
      );
      socket.emit('snakes-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('snakes-provablyFair-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-roll')
  async handleRoll(
    @MessageBody() snakesRollDiceDto: SnakesRollDiceDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-roll');
    try {
      const result = await this.snakesKafka.rollDice(
        snakesRollDiceDto,
        traceId,
      );
      socket.emit('snakes-roll-result', result);
    } catch (e: any) {
      socket.emit('snakes-roll-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('snakes-cashout')
  async handleCashout(
    @MessageBody() snakesCashoutDto: SnakesCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('snakes-cashout');
    try {
      const result = await this.snakesKafka.cashout(snakesCashoutDto, traceId);
      socket.emit('snakes-cashout-result', result);
    } catch (e: any) {
      socket.emit('snakes-cashout-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DiceKafkaService } from './dice-kafka.service';
import {
  CashoutDiceGameDto,
  DiceConfigRequestDto,
  AutoBetSettingsDto,
  RollDiceDto,
  StartDiceGameDto,
  generateTraceId,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'dice', cors: CORS_ALLOW })
export class DiceGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(DiceGateway.name);

  constructor(private readonly diceKafka: DiceKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${DiceGateway.name} initialized`,
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

  @SubscribeMessage('dice-start')
  async handleDiceStart(
    @MessageBody() startDiceGameDto: StartDiceGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-start');
    try {
      const result = await this.diceKafka.startGame(startDiceGameDto, traceId);
      socket.emit('dice-start-result', result);
    } catch (e: any) {
      socket.emit('dice-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dice-roll')
  async handleDiceRoll(
    @MessageBody() rollDiceDto: RollDiceDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-roll');
    try {
      const result = await this.diceKafka.roll(rollDiceDto, traceId);
      socket.emit('dice-roll-result', result);
    } catch (e: any) {
      socket.emit('dice-roll-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dice-cashout')
  async handleDiceCashout(
    @MessageBody() cashoutDiceGameDto: CashoutDiceGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-cashout');
    try {
      const result = await this.diceKafka.cashout(cashoutDiceGameDto, traceId);
      socket.emit('dice-cashout-result', result);
    } catch (e: any) {
      socket.emit('dice-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dice-config')
  async handleDiceConfig(
    @MessageBody() diceConfigRequestDto: DiceConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-config');
    try {
      const result = await this.diceKafka.config(diceConfigRequestDto, traceId);
      socket.emit('dice-config-result', result);
    } catch (e: any) {
      socket.emit('dice-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dice-provablyFair')
  async handleDiceProvablyFair(
    @MessageBody() cashoutDiceGameDto: CashoutDiceGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-provablyFair');
    try {
      const result = await this.diceKafka.provablyFair(
        cashoutDiceGameDto,
        traceId,
      );
      socket.emit('dice-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('dice-provablyFair-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('dice-auto-bet')
  async handleDiceAutoBet(
    @MessageBody() autoBetSettingsDto: AutoBetSettingsDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-auto-bet');
    try {
      const result = await this.diceKafka.autoBet(autoBetSettingsDto, traceId);
      socket.emit('dice-auto-bet-result', result);
    } catch (e: any) {
      socket.emit('dice-auto-bet-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

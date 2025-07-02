import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PumpKafkaService } from './pump-kafka.service';
import {
  generateTraceId,
  StartPumpDto,
  PumpDto,
  PumpCashoutDto,
  PumpConfigRequestDto,
  PumpProvablyFairRequestDto,
  PumpAutoBetSettingsDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'pump', cors: CORS_ALLOW })
export class PumpGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PumpGateway.name);

  constructor(private readonly pumpKafka: PumpKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PumpGateway.name} initialized`,
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

  @SubscribeMessage('pump-start')
  async handlePumpStart(
    @MessageBody() startPumpDto: StartPumpDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-start');
    try {
      const result = await this.pumpKafka.startGame(startPumpDto, traceId);
      socket.emit('pump-start-result', result);
    } catch (e: any) {
      socket.emit('pump-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('pump-pump')
  async handlePump(
    @MessageBody() pumpDto: PumpDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-pump');
    try {
      const result = await this.pumpKafka.pump(pumpDto, traceId);
      socket.emit('pump-pump-result', result);
    } catch (e: any) {
      socket.emit('pump-pump-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('pump-cashout')
  async handleCashoutPump(
    @MessageBody() pumpCashoutDto: PumpCashoutDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-cashout');
    try {
      const result = await this.pumpKafka.cashout(pumpCashoutDto, traceId);
      socket.emit('pump-cashout-result', result);
    } catch (e: any) {
      socket.emit('pump-cashout-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('pump-config')
  async handleConfigPump(
    @MessageBody() pumpConfigRequestDto: PumpConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-config');
    try {
      const result = await this.pumpKafka.config(pumpConfigRequestDto, traceId);
      socket.emit('pump-config-result', result);
    } catch (e: any) {
      socket.emit('pump-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('pump-provablyFair')
  async handleProvablyFairPump(
    @MessageBody() pumpProvablyFairRequestDto: PumpProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-provablyFair');
    try {
      const result = await this.pumpKafka.provablyFair(
        pumpProvablyFairRequestDto,
        traceId,
      );
      socket.emit('pump-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('pump-provablyFair-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('pump-auto-bet')
  async handleAutoBet(
    @MessageBody() pumpAutoBetSettingsDto: PumpAutoBetSettingsDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('pump-auto-bet');
    try {
      const result = await this.pumpKafka.autoBet(
        pumpAutoBetSettingsDto,
        traceId,
      );
      socket.emit('pump-auto-bet-result', result);
    } catch (e: any) {
      socket.emit('pump-auto-bet-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BlackjackKafkaService } from './blackjack-kafka.service';
import {
  generateTraceId,
  BlackjackStartGameDto,
  BlackjackHitDto,
  BlackjackStandDto,
  BlackjackSplitDto,
  BlackjackDoubleDto,
  BlackjackInsuranceDto,
  BlackjackConfigRequestDto,
  BlackjackProvablyFairRequestDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'blackjack', cors: CORS_ALLOW })
export class BlackjackGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = getLoggerConfig(BlackjackGateway.name);

  constructor(private readonly blackjackKafkaService: BlackjackKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${BlackjackGateway.name} initialized`,
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

  @SubscribeMessage('blackjack-start')
  async handleStart(
    @MessageBody() blackjackStartGameDto: BlackjackStartGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-start');
    try {
      const result = await this.blackjackKafkaService.startGame(
        blackjackStartGameDto,
        traceId,
      );
      socket.emit('blackjack-start-result', result);
    } catch (e: any) {
      socket.emit('blackjack-start-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-hit')
  async handleHit(
    @MessageBody() blackjackHitDto: BlackjackHitDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-hit');
    try {
      const result = await this.blackjackKafkaService.hit(
        blackjackHitDto,
        traceId,
      );
      socket.emit('blackjack-hit-result', result);
    } catch (e: any) {
      socket.emit('blackjack-hit-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-stand')
  async handleStand(
    @MessageBody() blackjackStandDto: BlackjackStandDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-stand');
    try {
      const result = await this.blackjackKafkaService.stand(
        blackjackStandDto,
        traceId,
      );
      socket.emit('blackjack-stand-result', result);
    } catch (e: any) {
      socket.emit('blackjack-stand-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-split')
  async handleSplit(
    @MessageBody() blackjackSplitDto: BlackjackSplitDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-split');
    try {
      const result = await this.blackjackKafkaService.split(
        blackjackSplitDto,
        traceId,
      );
      socket.emit('blackjack-split-result', result);
    } catch (e: any) {
      socket.emit('blackjack-split-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-double')
  async handleDouble(
    @MessageBody() blackjackDoubleDto: BlackjackDoubleDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-double');
    try {
      const result = await this.blackjackKafkaService.double(
        blackjackDoubleDto,
        traceId,
      );
      socket.emit('blackjack-double-result', result);
    } catch (e: any) {
      socket.emit('blackjack-double-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-insurance')
  async handleInsurance(
    @MessageBody() blackjackInsuranceDto: BlackjackInsuranceDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-insurance');
    try {
      const result = await this.blackjackKafkaService.insurance(
        blackjackInsuranceDto,
        traceId,
      );
      socket.emit('blackjack-insurance-result', result);
    } catch (e: any) {
      socket.emit('blackjack-insurance-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-config')
  async handleConfig(
    @MessageBody() blackjackConfigRequestDto: BlackjackConfigRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-config');
    try {
      const result = await this.blackjackKafkaService.config(
        blackjackConfigRequestDto,
        traceId,
      );
      socket.emit('blackjack-config-result', result);
    } catch (e: any) {
      socket.emit('blackjack-config-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('blackjack-provablyFair')
  async handleProvablyFair(
    @MessageBody()
    blackjackProvablyFairRequestDto: BlackjackProvablyFairRequestDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('blackjack-provablyFair');
    try {
      const result = await this.blackjackKafkaService.provablyFair(
        blackjackProvablyFairRequestDto,
        traceId,
      );
      socket.emit('blackjack-provablyFair-result', result);
    } catch (e: any) {
      socket.emit('blackjack-provablyFair-error', e.message || 'Unknown error');
    }
  }

  sendGameEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

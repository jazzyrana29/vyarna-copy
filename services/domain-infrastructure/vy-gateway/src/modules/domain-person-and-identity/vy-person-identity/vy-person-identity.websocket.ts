import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonIdentityKafkaService } from './vy-person-identity-kafka.service';
import {
  CashoutPersonIdentityGameDto,
  PersonIdentityConfigRequestDto,
  AutoBetSettingsDto,
  RollPersonIdentityDto,
  StartPersonIdentityGameDto,
  generateTraceId,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'dice', cors: CORS_ALLOW })
export class PersonIdentityWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonIdentityWebsocket.name);

  constructor(private readonly diceKafka: PersonIdentityKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonIdentityWebsocket.name} initialized`,
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
  async handlePersonIdentityStart(
    @MessageBody() startPersonIdentityGameDto: StartPersonIdentityGameDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const traceId = generateTraceId('dice-start');
    try {
      const result = await this.diceKafka.startGame(
        startPersonIdentityGameDto,
        traceId,
      );
      socket.emit('dice-start-result', result);
    } catch (e: any) {
      socket.emit('dice-start-error', e.message || 'Unknown error');
    }
  }
}

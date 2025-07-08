import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonEmailKafkaService } from './microservices/vy-person-email-kafka.service';
import {
  generateTraceId,
  CreateEmailDto,
  UpdateEmailDto,
  GetEmailDto,
  GetZtrackingEmailDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-email', cors: CORS_ALLOW })
export class PersonEmailWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonEmailWebsocket.name);

  constructor(private readonly emailKafka: PersonEmailKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonEmailWebsocket.name} initialized`,
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

  @SubscribeMessage('person-email-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createEmailDto: CreateEmailDto,
  ) {
    const traceId = generateTraceId('person-email-create');
    try {
      const result = await this.emailKafka.createEmail(createEmailDto, traceId);
      socket.emit('person-email-create-result', result);
    } catch (e: any) {
      socket.emit('person-email-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-email-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updateEmailDto: UpdateEmailDto,
  ) {
    const traceId = generateTraceId('person-email-update');
    try {
      const result = await this.emailKafka.updateEmail(updateEmailDto, traceId);
      socket.emit('person-email-update-result', result);
    } catch (e: any) {
      socket.emit('person-email-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-email-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getEmailDto: GetEmailDto,
  ) {
    const traceId = generateTraceId('person-email-get');
    try {
      const result = await this.emailKafka.getEmail(getEmailDto, traceId);
      socket.emit('person-email-get-result', result);
    } catch (e: any) {
      socket.emit('person-email-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-email-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getDto: GetZtrackingEmailDto,
  ) {
    const traceId = generateTraceId('person-email-get-history');
    try {
      const result = await this.emailKafka.getHistory(getDto, traceId);
      socket.emit('person-email-get-history-result', result);
    } catch (e: any) {
      socket.emit('person-email-get-history-error', e.message || 'Unknown error');
    }
  }
}

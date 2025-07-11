import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonContactKafkaService } from './microservices/vy-person-contact-kafka.service';
import { generateTraceId, CreateContactDto, KT_CREATE_CONTACT } from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-contact', cors: CORS_ALLOW })
export class PersonContactWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonContactWebsocket.name);

  constructor(private readonly contactKafka: PersonContactKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonContactWebsocket.name} initialized`,
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

  @SubscribeMessage(KT_CREATE_CONTACT)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createContactDto: CreateContactDto,
  ) {
    const traceId = generateTraceId('person-contact-create');
    try {
      const result = await this.contactKafka.createContact(
        createContactDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_CONTACT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_CONTACT}-error`, e.message || 'Unknown error');
    }
  }
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonPhysicalAddressKafkaService } from './microservices/vy-physical-address-kafka.service';
import {
  generateTraceId,
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  GetOnePersonDto,
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
  JoinRoomDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-physical-address', cors: CORS_ALLOW })
export class PersonPhysicalAddressWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonPhysicalAddressWebsocket.name);

  constructor(
    private readonly addressKafka: PersonPhysicalAddressKafkaService,
  ) {}

  afterInit() {
    this.logger.debug(
      `${PersonPhysicalAddressWebsocket.name} initialized`,
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
    (socket.data as any).logger = this.logger;
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinRoomDto: JoinRoomDto,
  ) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(
        `Socket ${socket.id} joined room ${room}`,
        '',
        'handleJoin',
        LogStreamLevel.DebugLight,
      );
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_CREATE_PHYSICAL_ADDRESS)
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: CreatePhysicalAddressDto,
  ) {
    const traceId = generateTraceId('physical-address-create');
    try {
      const result = await this.addressKafka.createAddress(dto, traceId);
      socket.emit(`${KT_CREATE_PHYSICAL_ADDRESS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_PHYSICAL_ADDRESS}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_UPDATE_PHYSICAL_ADDRESS)
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: UpdatePhysicalAddressDto,
  ) {
    const traceId = generateTraceId('physical-address-update');
    try {
      const result = await this.addressKafka.updateAddress(dto, traceId);
      socket.emit(`${KT_UPDATE_PHYSICAL_ADDRESS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_UPDATE_PHYSICAL_ADDRESS}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_PHYSICAL_ADDRESS)
  async handleGet(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: GetOnePersonDto,
  ) {
    const traceId = generateTraceId('physical-address-get');
    try {
      const result = await this.addressKafka.getAddress(dto, traceId);
      socket.emit(`${KT_GET_PHYSICAL_ADDRESS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_PHYSICAL_ADDRESS}-error`,
        e.message || 'Unknown error',
      );
    }
  }
}

import { WebSocketGateway, WebSocketServer, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-contact', cors: CORS_ALLOW })
export class PersonContactGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger = getLoggerConfig(PersonContactGateway.name);

  afterInit() {
    this.logger.debug(
      `${PersonContactGateway.name} initialized`,
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

  sendMessageToClient(payload: { mode: string; message: string; dateTime: Date }) {
    this.server.emit(payload.mode, payload);
  }
}

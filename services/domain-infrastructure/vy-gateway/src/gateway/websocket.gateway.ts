// src/events.gateway.ts
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LogStreamLevel } from 'ez-logger';
import { ClientMessagesMode } from '../constants/ClientMessagesMode';
import { CORS_ALLOW, getLoggerConfig } from '../utils/common';

type ClientMessage = {
  message: string;
  mode: (typeof ClientMessagesMode)[keyof typeof ClientMessagesMode];
  dateTime: Date;
  [key: string]: string | number | boolean | object; // Adjust types as needed
};

@WebSocketGateway({ cors: CORS_ALLOW })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = getLoggerConfig(WebsocketGateway.name);

  afterInit() {
    this.logger.debug(
      `${WebsocketGateway.name} initialized`,
      '',
      'afterInit',
      LogStreamLevel.DebugLight,
    );
  }

  handleConnection(client: Socket): void {
    this.logger.debug(
      `Client connected: ${client.id}`,
      '',
      'handleConnection',
      LogStreamLevel.DebugLight,
    );
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(
      `Client disconnected: ${client.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  sendMessageToClient(message: ClientMessage): void {
    this.logger.debug(
      `Message processed => ${message.message}`,
      '',
      'sendMessageToClient',
      LogStreamLevel.DebugLight,
    );
    this.server.emit('message', message);
  }
}

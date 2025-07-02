// src/events.gateway.ts
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientMessagesMode } from '../constants/ClientMessagesMode';

type ClientMessage = {
  message: string;
  mode: (typeof ClientMessagesMode)[keyof typeof ClientMessagesMode];
  dateTime: Date;
  [key: string]: string | number | boolean | object; // Adjust types as needed
};

@WebSocketGateway({
  cors: {
    origin: process.env.APP_URL,
    methods: ['GET', 'POST'],
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    console.warn(`Client Connected => ${client.id}`, 'handleConnection');
  }

  handleDisconnect(client: Socket): void {
    console.error(`Client Disconnected => ${client.id}`, 'handleDisconnect');
  }

  sendMessageToClient(message: ClientMessage): void {
    console.info(
      `Message Processed => ${message.message}`,
      'sendMessageToClient',
    );
    this.server.emit('message', message);
  }
}

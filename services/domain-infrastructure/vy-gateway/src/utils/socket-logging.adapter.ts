import { IoAdapter } from '@nestjs/platform-socket.io';
import type { INestApplicationContext } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { getLoggerConfig } from './common';
import { LogStreamLevel } from 'ez-logger';

export class SocketLoggingAdapter extends IoAdapter {
  private logger = getLoggerConfig('SocketLoggingAdapter');

  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: any): Server {
    const server = super.createIOServer(port, options);

    server.on('connection', (socket: Socket) => {
      const origEmit = socket.emit.bind(socket);
      socket.emit = (event: string, ...args: any[]) => {
        const l = (socket.data as any)?.logger ?? this.logger;
        l.info(
          `emit ${event} payload: ${JSON.stringify(args)}`,
          '',
          'socket.emit',
          LogStreamLevel.DebugLight,
        );
        return origEmit(event, ...args);
      };

      socket.onAny((event: string, ...args: any[]) => {
        const l = (socket.data as any)?.logger ?? this.logger;
        l.info(
          `on ${event} payload: ${JSON.stringify(args)}`,
          '',
          'socket.onAny',
          LogStreamLevel.DebugLight,
        );
      });
    });

    return server;
  }
}

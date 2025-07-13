// services/socketService.ts
import { io, Socket } from 'socket.io-client';
import { EXPO_PUBLIC_API_URL } from '@env';

export interface SocketServiceOptions {
  namespace: string; // e.g. "sales-commerce"
  token?: string; // optional auth token
  transports?: string[]; // e.g. ["websocket"]
}

export class SocketService {
  private socket!: Socket;
  private namespaceUrl: string;

  constructor(private opts: SocketServiceOptions) {
    this.namespaceUrl = `${EXPO_PUBLIC_API_URL}/${opts.namespace}`;
  }

  connect() {
    if (this.socket && this.socket.connected) return;

    this.socket = io(this.namespaceUrl, {
      transports: this.opts.transports ?? ['websocket', 'polling'],
      auth: this.opts.token ? { token: this.opts.token } : undefined,
      // any other socket.io-client options...
    });

    this.socket.on('connect', () => {
      console.log(
        `[SocketService:${this.opts.namespace}] connected as ${this.socket.id}`,
      );
    });
    this.socket.on('disconnect', (reason) => {
      console.log(
        `[SocketService:${this.opts.namespace}] disconnected:`,
        reason,
      );
    });
  }

  /**
   * Join a room (server will run socket.join(room))
   */
  joinRoom(room: string) {
    if (!this.socket) this.connect();
    this.socket.emit('join', { room });
  }

  /**
   * Emit any event with a payload
   */
  emit<T = any>(event: string, payload?: T) {
    if (!this.socket) this.connect();
    this.socket.emit(event, payload);
  }

  /**
   * Listen for any event
   */
  on<T = any>(event: string, handler: (data: T) => void) {
    if (!this.socket) this.connect();
    this.socket.on(event, handler);
  }

  /**
   * Stop listening
   */
  off(event: string, handler?: (...args: any[]) => void) {
    this.socket.off(event, handler);
  }

  /**
   * Clean up
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

import { io, type Socket } from 'socket.io-client';
import {
  WS_MESSAGES,
  type WSMessage,
  type WSMessageType,
} from '../constants/websocket-messages';
import { EXPO_PUBLIC_API_URL } from '@env';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers = new Map<
    WSMessageType,
    Set<(payload: any) => void>
  >();
  private pendingRequests = new Map<
    string,
    {
      resolve: (value: any) => void;
      reject: (error: any) => void;
      // @ts-ignore
      timeout: NodeJS.Timeout;
    }
  >();

  constructor() {
    this.connect();
  }

  public get isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Public methods
  public emit<T>(type: WSMessageType, payload: T): void {
    if (!this.socket?.connected) {
      console.warn('WebSocket not connected, message not sent:', type);
      return;
    }

    const message: WSMessage<T> = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    this.socket.emit(type, message);
  }

  public request<T, R>(
    type: WSMessageType,
    payload: T,
    timeout = 10000,
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const timeoutHandle = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error('Request timeout'));
      }, timeout);

      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timeout: timeoutHandle,
      });

      const message: WSMessage<T> = {
        type,
        payload,
        requestId,
        timestamp: new Date().toISOString(),
      };

      this.socket.emit(type, message);
    });
  }

  public on<T>(type: WSMessageType, handler: (payload: T) => void): () => void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }

    this.messageHandlers.get(type)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.messageHandlers.delete(type);
        }
      }
    };
  }

  public joinRoom(room: string): void {
    this.emit(WS_MESSAGES.JOIN_ROOM, { room });
  }

  public leaveRoom(room: string): void {
    this.emit(WS_MESSAGES.LEAVE_ROOM, { room });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    // Clear pending requests
    this.pendingRequests.forEach(({ reject, timeout }) => {
      clearTimeout(timeout);
      reject(new Error('WebSocket disconnected'));
    });
    this.pendingRequests.clear();
  }

  private connect() {
    const serverUrl = EXPO_PUBLIC_API_URL || 'http://localhost:3001';

    this.socket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
      this.emit(WS_MESSAGES.CONNECTION_ESTABLISHED, {});
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    // Listen for all message types
    Object.values(WS_MESSAGES).forEach((messageType) => {
      this.socket?.on(messageType, (data: any) => {
        this.handleMessage(messageType, data);
      });
    });
  }

  private handleMessage(type: WSMessageType, payload: any) {
    // Handle request/response pattern
    if (payload.requestId && this.pendingRequests.has(payload.requestId)) {
      const request = this.pendingRequests.get(payload.requestId)!;
      clearTimeout(request.timeout);
      this.pendingRequests.delete(payload.requestId);

      if (type.includes('error') || !payload.success) {
        request.reject(new Error(payload.message || 'Request failed'));
      } else {
        request.resolve(payload);
      }
      return;
    }

    // Handle broadcast messages
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`Error in message handler for ${type}:`, error);
        }
      });
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(
          `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
        );
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }
}

// Singleton instance
export const wsService = new WebSocketService();

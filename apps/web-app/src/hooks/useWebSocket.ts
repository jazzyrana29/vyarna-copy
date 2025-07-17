import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { EXPO_PUBLIC_API_URL } from '@env';
import { ServerMessagesMode } from '../constants/server-messages-mode';

export type ServerMessage = {
  message: string;
  mode: (typeof ServerMessagesMode)[keyof typeof ServerMessagesMode];
  dateTime: Date;
  [key: string]: string | number | boolean | object;
};

const useWebSocket = (showMessages = true): ServerMessage[] => {
  const [messages, setMessages] = useState<ServerMessage[]>([]);

  useEffect(() => {
    const socket = io(`${EXPO_PUBLIC_API_URL}`, { transports: ['websocket'] });

    socket.on('connect', () => {
      if (showMessages) {
        console.log('Connected to WebSocket server');
      }
    });

    socket.on('message', (newMessage: ServerMessage) => {
      setMessages((prev) => [newMessage, ...prev]);
    });

    socket.on('disconnect', () => {
      if (showMessages) {
        console.log('Disconnected from WebSocket server');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [showMessages]);

  return messages;
};

export default useWebSocket;

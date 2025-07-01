// src/hooks/useWebSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ServerMessagesMode } from "../constants/server-messages-mode";

type ServerMessage = {
  message: string;
  mode: (typeof ServerMessagesMode)[keyof typeof ServerMessagesMode];
  dateTime: Date;
  [key: string]: string | number | boolean | object; // Adjust types as needed
};

const useWebSocket = (): ServerMessage[] => {
  const [messages, setMessages] = useState<ServerMessage[]>([]);

  useEffect(() => {
    const socket = io(`${process.env.EXPO_PUBLIC_API_URL}`, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("message", (newMessage: ServerMessage) => {
      setMessages([newMessage, ...messages]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return (): void => {
      socket.disconnect();
    };
  }, []);

  return messages;
};

export default useWebSocket;

import React, { useEffect } from "react";

import useWebSocket from "../hooks/useWebSocket";
import { ServerMessagesMode } from "../constants/server-messages-mode";

const WebsocketsMessages = () => {
  const messages = useWebSocket();

  useEffect(() => {
    if (messages?.length) {
      const latestMessage = messages[0];

      if (latestMessage?.mode === ServerMessagesMode.CONNECTION_ESTABLISHED) {
        console.log("Web socket Connection Established");
      } else if (
        latestMessage?.mode === ServerMessagesMode?.NEW_CONTACT_CREATED
      ) {
        console.log("Connection created from websocket");
      }
    }
    console.log("Notification => ", messages);
  }, [messages]);

  return <></>;
};

export default WebsocketsMessages;

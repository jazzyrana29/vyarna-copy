import React, { useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { ServerMessagesMode } from '../constants/server-messages-mode';
import { showToast } from '../store/toastStore';

interface Props {
  show?: boolean;
}

const WebsocketsMessages = ({ show = true }: Props): JSX.Element => {
  const messages = useWebSocket(show);

  useEffect(() => {
    if (!show) return;
    if (messages?.length) {
      const latestMessage = messages[0];
      if (latestMessage?.mode === ServerMessagesMode.CONNECTION_ESTABLISHED) {
        showToast('Web socket connected', 'success');
      } else if (latestMessage?.mode === ServerMessagesMode.NEW_CONTACT_CREATED) {
        showToast('New contact created', 'info');
      } else if (latestMessage?.message) {
        showToast(latestMessage.message, 'info');
      }
    }
    console.log('Notification => ', messages);
  }, [messages, show]);

  return <></>;
};

export default WebsocketsMessages;

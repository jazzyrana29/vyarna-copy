import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_GET_CONTACT,
  KT_GET_CONTACT_ERROR,
  KT_GET_CONTACT_RESULT,
  SOCKET_NAMESPACE_PERSON_CONTACT,
} from '../constants/socketEvents';
import { ContactDto, CreateContactDto } from 'ez-utils';
import { useUserStore } from '../store/userStore';

export function usePersonContact(
  roomId: string,
  query: CreateContactDto,
): {
  stripeCustomerId: any;
  loading: boolean;
  error: string | null;
  getContact: (dto: CreateContactDto) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeCustomerId = useUserStore((s) => s.stripeCustomerId);
  const setStripeCustomerId = useUserStore((s) => s.setStripeCustomerId);

  // only connect if we actually need to fetch/create
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_CONTACT,
    transports: ['websocket'],
  });

  useEffect(() => {
    socketSvc.connect();
    socketSvc.on<ContactDto>(KT_GET_CONTACT_RESULT, (contact) => {
      console.log('contact found =>', contact);
      setStripeCustomerId(contact.stripeCustomerId);
      setLoading(false);
    });
    socketSvc.on<string>(KT_GET_CONTACT_ERROR, (msg) => {
      console.log('contact found error', msg);
      setError(msg);
      setLoading(false);
    });

    socketSvc.emit<CreateContactDto>(KT_GET_CONTACT, { ...query });
    return (): void => socketSvc.disconnect();
  }, [roomId, JSON.stringify(query)]);

  const getContact = async (dto: CreateContactDto): Promise<void> => {
    setLoading(true);
    setError(null);
    socketSvc.emit<CreateContactDto>(KT_GET_CONTACT, dto);
  };

  return { stripeCustomerId, loading, error, getContact };
}

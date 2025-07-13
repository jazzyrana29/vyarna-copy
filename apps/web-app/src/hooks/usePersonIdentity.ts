import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_GET_CONTACT,
  KT_GET_CONTACT_ERROR,
  KT_GET_CONTACT_RESULT,
  SOCKET_NAMESPACE_PERSON_IDENTITY,
} from '../constants/socketEvents';
import { ContactDto, CreateContactDto } from 'ez-utils';
import { useUserStore } from '../store/userStore';

export function usePersonIdentity(): {
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
    namespace: SOCKET_NAMESPACE_PERSON_IDENTITY,
    transports: ['websocket'],
  });

  useEffect(() => {
    socketSvc.connect();
    socketSvc.on<ContactDto>(KT_GET_CONTACT_RESULT, (contact) => {
      setStripeCustomerId(contact.stripeCustomerId);
      setLoading(false);
    });
    socketSvc.on<string>(KT_GET_CONTACT_ERROR, (msg) => {
      setError(msg);
      setLoading(false);
    });
    return (): void => socketSvc.disconnect();
  }, []);

  const getContact = async (dto: CreateContactDto): Promise<void> => {
    setLoading(true);
    setError(null);
    socketSvc.emit<CreateContactDto>(KT_GET_CONTACT, dto);
  };

  return { stripeCustomerId, loading, error, getContact };
}

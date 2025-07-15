import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_GET_CONTACT,
  KT_GET_CONTACT_ERROR,
  KT_GET_CONTACT_RESULT,
  SOCKET_NAMESPACE_PERSON_CONTACT,
} from '../constants/socketEvents';
import { CreatePersonDto, PersonWithoutPasswordDto } from 'ez-utils';
import { useUserStore } from '../store/userStore';

export function usePersonContact(
  roomId: string,
  query: CreatePersonDto,
): {
  personId: string | null;
  stripeCustomerId: string | null;
  loading: boolean;
  error: string | null;
  getContact: (dto: CreatePersonDto) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const personId = useUserStore((s) => s.personId);
  const setPersonId = useUserStore((s) => s.setPersonId);
  const stripeCustomerId = useUserStore((s) => s.stripeCustomerId);
  const setStripeCustomerId = useUserStore((s) => s.setStripeCustomerId);

  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_CONTACT,
    transports: ['websocket'],
  });

  useEffect(() => {
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    socketSvc.on<PersonWithoutPasswordDto>(KT_GET_CONTACT_RESULT, (person) => {
      setPersonId(person.personId);
      if (person.stripeCustomerId) {
        setStripeCustomerId(person.stripeCustomerId);
      }
      setLoading(false);
    });

    socketSvc.on<string>(KT_GET_CONTACT_ERROR, (msg) => {
      setError(msg);
      setLoading(false);
    });

    setLoading(true);
    socketSvc.emit<CreatePersonDto>(KT_GET_CONTACT, { ...query });

    return () => socketSvc.disconnect();
  }, [roomId, JSON.stringify(query)]);

  const getContact = async (dto: CreatePersonDto): Promise<void> => {
    setLoading(true);
    setError(null);
    socketSvc.emit<CreatePersonDto>(KT_GET_CONTACT, dto);
  };

  return { personId, stripeCustomerId, loading, error, getContact };
}

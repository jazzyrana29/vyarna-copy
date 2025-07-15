import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_CREATE_PERSON,
  KT_CREATE_PERSON_ERROR,
  KT_CREATE_PERSON_RESULT,
  SOCKET_NAMESPACE_PERSON_IDENTITY,
} from '../constants/socketEvents';
import { CreatePersonDto, PersonWithoutPasswordDto } from 'ez-utils';
import { useUserStore } from '../store/userStore';

export function usePersonIdentity(
  roomId: string,
  query: CreatePersonDto,
): {
  personId: string | null;
  stripeCustomerId: string | null;
  loading: boolean;
  error: string | null;
  createPerson: (dto: CreatePersonDto) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const personId = useUserStore((s) => s.personId);
  const setPersonId = useUserStore((s) => s.setPersonId);
  const stripeCustomerId = useUserStore((s) => s.stripeCustomerId);
  const setStripeCustomerId = useUserStore((s) => s.setStripeCustomerId);

  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_IDENTITY,
    transports: ['websocket'],
  });

  useEffect(() => {
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    socketSvc.on<PersonWithoutPasswordDto>(
      KT_CREATE_PERSON_RESULT,
      (person) => {
        setPersonId(person.personId);
        if (person.stripeCustomerId) {
          setStripeCustomerId(person.stripeCustomerId);
        }
        setLoading(false);
      },
    );

    socketSvc.on<string>(KT_CREATE_PERSON_ERROR, (msg) => {
      setError(msg);
      setLoading(false);
    });

    setLoading(true);
    socketSvc.emit<CreatePersonDto>(KT_CREATE_PERSON, { ...query });

    return () => socketSvc.disconnect();
  }, [roomId, JSON.stringify(query)]);

  const createPerson = async (dto: CreatePersonDto): Promise<void> => {
    setLoading(true);
    setError(null);
    socketSvc.emit<CreatePersonDto>(KT_CREATE_PERSON, dto);
  };

  return {
    personId,
    stripeCustomerId,
    loading,
    error,
    createPerson,
  };
}

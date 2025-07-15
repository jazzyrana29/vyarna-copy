import {
  SOCKET_NAMESPACE_PERSON_IDENTITY,
  KT_CREATE_PERSON,
  KT_CREATE_PERSON_RESULT,
  KT_CREATE_PERSON_ERROR,
} from '../constants/socketEvents';
import { SocketService } from '../services/socketService';
import { CreatePersonDto, PersonWithoutPasswordDto } from 'ez-utils';

export async function socketCreatePerson(
  roomId: string,
  dto: CreatePersonDto,
): Promise<PersonWithoutPasswordDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_IDENTITY,
    transports: ['websocket'],
  });

  return new Promise((resolve, reject) => {
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<PersonWithoutPasswordDto>(KT_CREATE_PERSON_RESULT, (data) => {
      cleanup();
      resolve(data);
    });

    socketSvc.on<string>(KT_CREATE_PERSON_ERROR, (msg) => {
      cleanup();
      reject(new Error(msg));
    });

    socketSvc.emit<CreatePersonDto>(KT_CREATE_PERSON, dto);
  });
}

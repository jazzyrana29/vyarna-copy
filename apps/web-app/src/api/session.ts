import {
  SOCKET_NAMESPACE_PERSON_SESSION,
  KT_CREATE_SESSION,
  KT_CREATE_SESSION_RESULT,
  KT_CREATE_SESSION_ERROR,
  KT_UPDATE_SESSION,
  KT_UPDATE_SESSION_RESULT,
  KT_UPDATE_SESSION_ERROR,
  KT_GET_SESSION,
  KT_GET_SESSION_RESULT,
  KT_GET_SESSION_ERROR,
  KT_DELETE_SESSION,
  KT_DELETE_SESSION_RESULT,
  KT_DELETE_SESSION_ERROR,
  KT_LOGIN_SESSION,
  KT_LOGIN_SESSION_RESULT,
  KT_LOGIN_SESSION_ERROR,
} from '../constants/socketEvents';
import { SocketService } from '../services/socketService';
import { useLoadingStore } from '../store/loadingStore';
import {
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
  LoginSessionDto,
  SessionDto,
} from 'ez-utils';

export async function socketCreateSession(roomId: string, dto: CreateSessionDto): Promise<SessionDto> {
  const socketSvc = new SocketService({ namespace: SOCKET_NAMESPACE_PERSON_SESSION, transports: ['websocket'] });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<SessionDto>(KT_CREATE_SESSION_RESULT, (data) => { cleanup(); stop(); resolve(data); });
    socketSvc.on<string>(KT_CREATE_SESSION_ERROR, (msg) => { cleanup(); stop(); reject(new Error(msg)); });
    socketSvc.emit<CreateSessionDto>(KT_CREATE_SESSION, dto);
  });
}

export async function socketUpdateSession(roomId: string, dto: UpdateSessionDto): Promise<SessionDto> {
  const socketSvc = new SocketService({ namespace: SOCKET_NAMESPACE_PERSON_SESSION, transports: ['websocket'] });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<SessionDto>(KT_UPDATE_SESSION_RESULT, (data) => { cleanup(); stop(); resolve(data); });
    socketSvc.on<string>(KT_UPDATE_SESSION_ERROR, (msg) => { cleanup(); stop(); reject(new Error(msg)); });
    socketSvc.emit<UpdateSessionDto>(KT_UPDATE_SESSION, dto);
  });
}

export async function socketGetSession(roomId: string, dto: GetOneSessionDto): Promise<SessionDto> {
  const socketSvc = new SocketService({ namespace: SOCKET_NAMESPACE_PERSON_SESSION, transports: ['websocket'] });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<SessionDto>(KT_GET_SESSION_RESULT, (data) => { cleanup(); stop(); resolve(data); });
    socketSvc.on<string>(KT_GET_SESSION_ERROR, (msg) => { cleanup(); stop(); reject(new Error(msg)); });
    socketSvc.emit<GetOneSessionDto>(KT_GET_SESSION, dto);
  });
}

export async function socketDeleteSession(roomId: string, dto: DeleteSessionDto): Promise<void> {
  const socketSvc = new SocketService({ namespace: SOCKET_NAMESPACE_PERSON_SESSION, transports: ['websocket'] });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<void>(KT_DELETE_SESSION_RESULT, () => { cleanup(); stop(); resolve(); });
    socketSvc.on<string>(KT_DELETE_SESSION_ERROR, (msg) => { cleanup(); stop(); reject(new Error(msg)); });
    socketSvc.emit<DeleteSessionDto>(KT_DELETE_SESSION, dto);
  });
}

export async function socketLoginSession(roomId: string, dto: LoginSessionDto): Promise<SessionDto> {
  const socketSvc = new SocketService({ namespace: SOCKET_NAMESPACE_PERSON_SESSION, transports: ['websocket'] });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<SessionDto>(KT_LOGIN_SESSION_RESULT, (data) => { cleanup(); stop(); resolve(data); });
    socketSvc.on<string>(KT_LOGIN_SESSION_ERROR, (msg) => { cleanup(); stop(); reject(new Error(msg)); });
    socketSvc.emit<LoginSessionDto>(KT_LOGIN_SESSION, dto);
  });
}

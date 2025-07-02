import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonRolesKafkaService } from './microservices/vy-person-roles-kafka.service';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'person-roles', cors: CORS_ALLOW })
export class PersonRolesWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonRolesWebsocket.name);

  constructor(private readonly personBabyKafka: PersonRolesKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonRolesWebsocket.name} initialized`,
      '',
      'afterInit',
      LogStreamLevel.DebugLight,
    );
  }

  handleConnection(socket: Socket) {
    this.logger.debug(
      `Client connected: ${socket.id}`,
      '',
      'handleConnection',
      LogStreamLevel.DebugLight,
    );
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('person-roles-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-roles-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-roles-create-result', result);
    } catch (e: any) {
      socket.emit('person-roles-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-roles-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-roles-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-roles-update-result', result);
    } catch (e: any) {
      socket.emit('person-roles-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-roles-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-roles-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-roles-get-result', result);
    } catch (e: any) {
      socket.emit('person-roles-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-roles-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-roles-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-roles-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-roles-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-roles-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-roles-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-roles-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-roles-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

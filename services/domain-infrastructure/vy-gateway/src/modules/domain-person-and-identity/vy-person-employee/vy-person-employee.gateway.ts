import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersonEmployeeKafkaService } from './microservices/vy-person-employee-kafka.service';
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

@WebSocketGateway({ namespace: 'person-employee', cors: CORS_ALLOW })
export class PersonEmployeeWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(PersonEmployeeWebsocket.name);

  constructor(private readonly personBabyKafka: PersonEmployeeKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${PersonEmployeeWebsocket.name} initialized`,
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

  @SubscribeMessage('person-employee-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('person-employee-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('person-employee-create-result', result);
    } catch (e: any) {
      socket.emit('person-employee-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-employee-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('person-employee-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('person-employee-update-result', result);
    } catch (e: any) {
      socket.emit('person-employee-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-employee-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('person-employee-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('person-employee-get-result', result);
    } catch (e: any) {
      socket.emit('person-employee-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('person-employee-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('person-employee-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('person-employee-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'person-employee-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('person-employee-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('person-employee-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('person-employee-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'person-employee-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

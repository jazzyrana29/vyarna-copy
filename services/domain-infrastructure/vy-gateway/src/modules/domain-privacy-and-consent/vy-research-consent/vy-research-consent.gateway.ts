import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ResearchConsentKafkaService } from './microservices/vy-research-consent-kafka.service';
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

@WebSocketGateway({ namespace: 'research-consent', cors: CORS_ALLOW })
export class ResearchConsentWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(ResearchConsentWebsocket.name);

  constructor(private readonly personBabyKafka: ResearchConsentKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${ResearchConsentWebsocket.name} initialized`,
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

  @SubscribeMessage('research-consent-create')
  async handleCreate(
    @ConnectedSocket() socket: Socket,
    createPersonDto: CreatePersonDto,
  ) {
    const traceId = generateTraceId('research-consent-create');
    try {
      const result = await this.personBabyKafka.createPerson(
        createPersonDto,
        traceId,
      );
      socket.emit('research-consent-create-result', result);
    } catch (e: any) {
      socket.emit('research-consent-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('research-consent-update')
  async handleUpdate(
    @ConnectedSocket() socket: Socket,
    updatePersonDto: UpdatePersonDto,
  ) {
    const traceId = generateTraceId('research-consent-update');
    try {
      const result = await this.personBabyKafka.updatePerson(
        updatePersonDto,
        traceId,
      );
      socket.emit('research-consent-update-result', result);
    } catch (e: any) {
      socket.emit('research-consent-update-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('research-consent-get')
  async handleGet(
    @ConnectedSocket() socket: Socket,
    getPersonDto: GetPersonDto,
  ) {
    const traceId = generateTraceId('research-consent-get');
    try {
      const result = await this.personBabyKafka.getPerson(getPersonDto, traceId);
      socket.emit('research-consent-get-result', result);
    } catch (e: any) {
      socket.emit('research-consent-get-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('research-consent-get-history')
  async handleHistory(
    @ConnectedSocket() socket: Socket,
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ) {
    const traceId = generateTraceId('research-consent-get-history');
    try {
      const result = await this.personBabyKafka.getHistory(
        getHistoryOfPersonDto,
        traceId,
      );
      socket.emit('research-consent-get-history-result', result);
    } catch (e: any) {
      socket.emit(
        'research-consent-get-history-error',
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage('research-consent-get-many')
  async handleGetMany(
    @ConnectedSocket() socket: Socket,
    getManyPersonsDto: GetManyPersonsDto,
  ) {
    const traceId = generateTraceId('research-consent-get-many');
    try {
      const result = await this.personBabyKafka.getManyPersons(
        getManyPersonsDto,
        traceId,
      );
      socket.emit('research-consent-get-many-result', result);
    } catch (e: any) {
      socket.emit(
        'research-consent-get-many-error',
        e.message || 'Unknown error',
      );
    }
  }
}

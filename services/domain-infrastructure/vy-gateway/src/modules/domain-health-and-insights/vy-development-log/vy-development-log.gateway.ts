import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DevelopmentLogKafkaService } from './microservices/vy-development-log-kafka.service';
import {
  generateTraceId,
  CreateGrowthMeasurementDto,
  GetGrowthMeasurementsDto,
  CreateMilestoneDto,
  GetMilestonesDto,
  CreateTeethingEventDto,
  GetTeethingEventsDto,
  CreateDevelopmentMomentDto,
  GetDevelopmentMomentsDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'development-log', cors: CORS_ALLOW })
export class DevelopmentLogWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(DevelopmentLogWebsocket.name);

  constructor(private readonly kafkaService: DevelopmentLogKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${DevelopmentLogWebsocket.name} initialized`,
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

  @SubscribeMessage('development-log-create-growth')
  async createGrowth(
    @ConnectedSocket() socket: Socket,
    createGrowthMeasurementDto: CreateGrowthMeasurementDto,
  ) {
    const traceId = generateTraceId('development-log-create-growth');
    try {
      const result = await this.kafkaService.createGrowth(
        createGrowthMeasurementDto,
        traceId,
      );
      socket.emit('development-log-create-growth-result', result);
    } catch (e: any) {
      socket.emit('development-log-create-growth-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-get-growth')
  async getGrowth(
    @ConnectedSocket() socket: Socket,
    getGrowthMeasurementsDto: GetGrowthMeasurementsDto,
  ) {
    const traceId = generateTraceId('development-log-get-growth');
    try {
      const result = await this.kafkaService.getGrowth(
        getGrowthMeasurementsDto,
        traceId,
      );
      socket.emit('development-log-get-growth-result', result);
    } catch (e: any) {
      socket.emit('development-log-get-growth-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-create-milestone')
  async createMilestone(
    @ConnectedSocket() socket: Socket,
    createMilestoneDto: CreateMilestoneDto,
  ) {
    const traceId = generateTraceId('development-log-create-milestone');
    try {
      const result = await this.kafkaService.createMilestone(
        createMilestoneDto,
        traceId,
      );
      socket.emit('development-log-create-milestone-result', result);
    } catch (e: any) {
      socket.emit('development-log-create-milestone-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-get-milestones')
  async getMilestones(
    @ConnectedSocket() socket: Socket,
    getMilestonesDto: GetMilestonesDto,
  ) {
    const traceId = generateTraceId('development-log-get-milestones');
    try {
      const result = await this.kafkaService.getMilestones(
        getMilestonesDto,
        traceId,
      );
      socket.emit('development-log-get-milestones-result', result);
    } catch (e: any) {
      socket.emit('development-log-get-milestones-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-create-teething-event')
  async createTeethingEvent(
    @ConnectedSocket() socket: Socket,
    createTeethingEventDto: CreateTeethingEventDto,
  ) {
    const traceId = generateTraceId('development-log-create-teething-event');
    try {
      const result = await this.kafkaService.createTeethingEvent(
        createTeethingEventDto,
        traceId,
      );
      socket.emit('development-log-create-teething-event-result', result);
    } catch (e: any) {
      socket.emit('development-log-create-teething-event-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-get-teething-events')
  async getTeethingEvents(
    @ConnectedSocket() socket: Socket,
    getTeethingEventsDto: GetTeethingEventsDto,
  ) {
    const traceId = generateTraceId('development-log-get-teething-events');
    try {
      const result = await this.kafkaService.getTeethingEvents(
        getTeethingEventsDto,
        traceId,
      );
      socket.emit('development-log-get-teething-events-result', result);
    } catch (e: any) {
      socket.emit('development-log-get-teething-events-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-create-moment')
  async createMoment(
    @ConnectedSocket() socket: Socket,
    createDevelopmentMomentDto: CreateDevelopmentMomentDto,
  ) {
    const traceId = generateTraceId('development-log-create-moment');
    try {
      const result = await this.kafkaService.createDevelopmentMoment(
        createDevelopmentMomentDto,
        traceId,
      );
      socket.emit('development-log-create-moment-result', result);
    } catch (e: any) {
      socket.emit('development-log-create-moment-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('development-log-get-moments')
  async getMoments(
    @ConnectedSocket() socket: Socket,
    getDevelopmentMomentsDto: GetDevelopmentMomentsDto,
  ) {
    const traceId = generateTraceId('development-log-get-moments');
    try {
      const result = await this.kafkaService.getDevelopmentMoments(
        getDevelopmentMomentsDto,
        traceId,
      );
      socket.emit('development-log-get-moments-result', result);
    } catch (e: any) {
      socket.emit('development-log-get-moments-error', e.message || 'Unknown error');
    }
  }
}

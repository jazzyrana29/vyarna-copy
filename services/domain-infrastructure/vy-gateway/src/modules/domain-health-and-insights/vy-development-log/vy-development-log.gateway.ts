import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DevelopmentLogKafkaService } from './microservices/vy-development-log-kafka.service';
import {
  generateTraceId,
  CreateGrowthMeasurementDto,
  GetManyGrowthMeasurementsDto,
  CreateMilestoneDto,
  GetManyMilestonesDto,
  CreateTeethingEventDto,
  GetManyTeethingEventsDto,
  CreateDevelopmentMomentDto,
  GetManyDevelopmentMomentsDto,
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  KT_CREATE_MILESTONE,
  KT_GET_MILESTONES,
  KT_CREATE_TEETHING_EVENT,
  KT_GET_TEETHING_EVENTS,
  KT_CREATE_DEVELOPMENT_MOMENT,
  KT_GET_DEVELOPMENT_MOMENTS,
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

  @SubscribeMessage(KT_CREATE_GROWTH_MEASUREMENT)
  async createGrowth(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createGrowthMeasurementDto: CreateGrowthMeasurementDto,
  ) {
    const traceId = generateTraceId('development-log-create-growth');
    try {
      const result = await this.kafkaService.createGrowth(
        createGrowthMeasurementDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_GROWTH_MEASUREMENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_GROWTH_MEASUREMENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_GROWTH_MEASUREMENTS)
  async getGrowth(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getGrowthMeasurementsDto: GetManyGrowthMeasurementsDto,
  ) {
    const traceId = generateTraceId('development-log-get-growth');
    try {
      const result = await this.kafkaService.getGrowth(
        getGrowthMeasurementsDto,
        traceId,
      );
      socket.emit(`${KT_GET_GROWTH_MEASUREMENTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_GROWTH_MEASUREMENTS}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_MILESTONE)
  async createMilestone(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createMilestoneDto: CreateMilestoneDto,
  ) {
    const traceId = generateTraceId('development-log-create-milestone');
    try {
      const result = await this.kafkaService.createMilestone(
        createMilestoneDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_MILESTONE}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_MILESTONE}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_MILESTONES)
  async getMilestones(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getMilestonesDto: GetManyMilestonesDto,
  ) {
    const traceId = generateTraceId('development-log-get-milestones');
    try {
      const result = await this.kafkaService.getMilestones(
        getMilestonesDto,
        traceId,
      );
      socket.emit(`${KT_GET_MILESTONES}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_MILESTONES}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_TEETHING_EVENT)
  async createTeethingEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createTeethingEventDto: CreateTeethingEventDto,
  ) {
    const traceId = generateTraceId('development-log-create-teething-event');
    try {
      const result = await this.kafkaService.createTeethingEvent(
        createTeethingEventDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_TEETHING_EVENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_TEETHING_EVENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_TEETHING_EVENTS)
  async getTeethingEvents(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getTeethingEventsDto: GetManyTeethingEventsDto,
  ) {
    const traceId = generateTraceId('development-log-get-teething-events');
    try {
      const result = await this.kafkaService.getTeethingEvents(
        getTeethingEventsDto,
        traceId,
      );
      socket.emit(`${KT_GET_TEETHING_EVENTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_TEETHING_EVENTS}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_DEVELOPMENT_MOMENT)
  async createMoment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createDevelopmentMomentDto: CreateDevelopmentMomentDto,
  ) {
    const traceId = generateTraceId('development-log-create-moment');
    try {
      const result = await this.kafkaService.createDevelopmentMoment(
        createDevelopmentMomentDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_DEVELOPMENT_MOMENT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_DEVELOPMENT_MOMENT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_DEVELOPMENT_MOMENTS)
  async getMoments(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getDevelopmentMomentsDto: GetManyDevelopmentMomentsDto,
  ) {
    const traceId = generateTraceId('development-log-get-moments');
    try {
      const result = await this.kafkaService.getDevelopmentMoments(
        getDevelopmentMomentsDto,
        traceId,
      );
      socket.emit(`${KT_GET_DEVELOPMENT_MOMENTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_DEVELOPMENT_MOMENTS}-error`, e.message || 'Unknown error');
    }
  }
}

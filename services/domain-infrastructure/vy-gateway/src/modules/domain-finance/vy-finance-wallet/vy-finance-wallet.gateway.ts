import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FinanceWalletKafkaService } from './microservices/vy-finance-wallet-kafka.service';
import {
  generateTraceId,
  CreateWalletAccountDto,
  ScheduleProviderPayoutDto,
  IssueConsumerRewardDto,
  CreateAffiliateCommissionDto,
  CreateInternalChargeDto,
  KT_CREATE_WALLET_ACCOUNT,
  KT_SCHEDULE_PROVIDER_PAYOUT,
  KT_ISSUE_CONSUMER_REWARD,
  KT_CREATE_AFFILIATE_COMMISSION,
  KT_CREATE_INTERNAL_CHARGE,
  JoinRoomDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'finance-wallet', cors: CORS_ALLOW })
export class FinanceWalletWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(FinanceWalletWebsocket.name);

  constructor(private readonly walletKafka: FinanceWalletKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${FinanceWalletWebsocket.name} initialized`,
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
    (socket.data as any).logger = this.logger;
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinRoomDto: JoinRoomDto,
  ) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(`Socket ${socket.id} joined room ${room}`, '', 'handleJoin', LogStreamLevel.DebugLight);
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_CREATE_WALLET_ACCOUNT)
  async handleCreateAccount(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createWalletAccountDto: CreateWalletAccountDto,
  ) {
    const traceId = generateTraceId('wallet-account-create');
    try {
      const result = await this.walletKafka.createWalletAccount(createWalletAccountDto, traceId);
      socket.emit(`${KT_CREATE_WALLET_ACCOUNT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_WALLET_ACCOUNT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_SCHEDULE_PROVIDER_PAYOUT)
  async handleSchedulePayout(
    @ConnectedSocket() socket: Socket,
    @MessageBody() scheduleProviderPayoutDto: ScheduleProviderPayoutDto,
  ) {
    const traceId = generateTraceId('wallet-provider-payout-schedule');
    try {
      const result = await this.walletKafka.scheduleProviderPayout(scheduleProviderPayoutDto, traceId);
      socket.emit(`${KT_SCHEDULE_PROVIDER_PAYOUT}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_SCHEDULE_PROVIDER_PAYOUT}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_ISSUE_CONSUMER_REWARD)
  async handleIssueReward(
    @ConnectedSocket() socket: Socket,
    @MessageBody() issueConsumerRewardDto: IssueConsumerRewardDto,
  ) {
    const traceId = generateTraceId('wallet-consumer-reward-issue');
    try {
      const result = await this.walletKafka.issueConsumerReward(issueConsumerRewardDto, traceId);
      socket.emit(`${KT_ISSUE_CONSUMER_REWARD}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_ISSUE_CONSUMER_REWARD}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_AFFILIATE_COMMISSION)
  async handleCreateCommission(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createAffiliateCommissionDto: CreateAffiliateCommissionDto,
  ) {
    const traceId = generateTraceId('wallet-affiliate-commission-create');
    try {
      const result = await this.walletKafka.createAffiliateCommission(createAffiliateCommissionDto, traceId);
      socket.emit(`${KT_CREATE_AFFILIATE_COMMISSION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_AFFILIATE_COMMISSION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_INTERNAL_CHARGE)
  async handleCreateCharge(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createInternalChargeDto: CreateInternalChargeDto,
  ) {
    const traceId = generateTraceId('wallet-internal-charge-create');
    try {
      const result = await this.walletKafka.createInternalCharge(createInternalChargeDto, traceId);
      socket.emit(`${KT_CREATE_INTERNAL_CHARGE}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_INTERNAL_CHARGE}-error`, e.message || 'Unknown error');
    }
  }
}

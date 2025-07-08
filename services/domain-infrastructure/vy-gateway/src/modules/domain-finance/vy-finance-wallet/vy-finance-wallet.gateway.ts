import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
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
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('wallet-account-create')
  async handleCreateAccount(
    @ConnectedSocket() socket: Socket,
    createWalletAccountDto: CreateWalletAccountDto,
  ) {
    const traceId = generateTraceId('wallet-account-create');
    try {
      const result = await this.walletKafka.createWalletAccount(createWalletAccountDto, traceId);
      socket.emit('wallet-account-create-result', result);
    } catch (e: any) {
      socket.emit('wallet-account-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('wallet-provider-payout-schedule')
  async handleSchedulePayout(
    @ConnectedSocket() socket: Socket,
    scheduleProviderPayoutDto: ScheduleProviderPayoutDto,
  ) {
    const traceId = generateTraceId('wallet-provider-payout-schedule');
    try {
      const result = await this.walletKafka.scheduleProviderPayout(scheduleProviderPayoutDto, traceId);
      socket.emit('wallet-provider-payout-schedule-result', result);
    } catch (e: any) {
      socket.emit('wallet-provider-payout-schedule-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('wallet-consumer-reward-issue')
  async handleIssueReward(
    @ConnectedSocket() socket: Socket,
    issueConsumerRewardDto: IssueConsumerRewardDto,
  ) {
    const traceId = generateTraceId('wallet-consumer-reward-issue');
    try {
      const result = await this.walletKafka.issueConsumerReward(issueConsumerRewardDto, traceId);
      socket.emit('wallet-consumer-reward-issue-result', result);
    } catch (e: any) {
      socket.emit('wallet-consumer-reward-issue-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('wallet-affiliate-commission-create')
  async handleCreateCommission(
    @ConnectedSocket() socket: Socket,
    createAffiliateCommissionDto: CreateAffiliateCommissionDto,
  ) {
    const traceId = generateTraceId('wallet-affiliate-commission-create');
    try {
      const result = await this.walletKafka.createAffiliateCommission(createAffiliateCommissionDto, traceId);
      socket.emit('wallet-affiliate-commission-create-result', result);
    } catch (e: any) {
      socket.emit('wallet-affiliate-commission-create-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('wallet-internal-charge-create')
  async handleCreateCharge(
    @ConnectedSocket() socket: Socket,
    createInternalChargeDto: CreateInternalChargeDto,
  ) {
    const traceId = generateTraceId('wallet-internal-charge-create');
    try {
      const result = await this.walletKafka.createInternalCharge(createInternalChargeDto, traceId);
      socket.emit('wallet-internal-charge-create-result', result);
    } catch (e: any) {
      socket.emit('wallet-internal-charge-create-error', e.message || 'Unknown error');
    }
  }
}

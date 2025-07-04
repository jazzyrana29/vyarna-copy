import { Injectable } from '@nestjs/common';
import { WalletAccountService } from './wallet-account.service';
import { ZtrackingWalletAccountService } from './ztracking-wallet-account.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_WALLET_ACCOUNT,
  KT_GET_WALLET_ACCOUNTS,
  KT_GET_ZTRACKING_WALLET_ACCOUNT,
  CreateWalletAccountDto,
  GetWalletAccountsDto,
  GetZtrackingWalletAccountDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletAccountKafkaService {
  public serviceName = WalletAccountKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly walletAccountService: WalletAccountService,
    private readonly ztrackingWalletAccountService: ZtrackingWalletAccountService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(
      `${WalletAccountKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWalletAccount(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_WALLET_ACCOUNT,
      message,
      key,
      async (value: CreateWalletAccountDto, traceId: string) =>
        await this.walletAccountService.createWalletAccount(value, traceId),
    );
  }

  async getWalletAccounts(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_WALLET_ACCOUNTS,
      message,
      key,
      async (value: GetWalletAccountsDto, traceId: string) =>
        await this.walletAccountService.getWalletAccounts(value, traceId),
    );
  }

  async getZtrackingWalletAccount(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_WALLET_ACCOUNT,
      message,
      key,
      async (value: GetZtrackingWalletAccountDto, traceId: string) =>
        await this.ztrackingWalletAccountService.getZtrackingForWalletAccount(value, traceId),
    );
  }
}

import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { WalletAccountKafkaService } from './services/wallet-account-kafka.service';
import {
  KT_CREATE_WALLET_ACCOUNT,
  KT_GET_WALLET_ACCOUNT,
  KT_GET_ZTRACKING_WALLET_ACCOUNT,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('wallet')
export class WalletController {
  private logger = getLoggerConfig(WalletController.name);

  constructor(private readonly walletKafkaService: WalletAccountKafkaService) {
    this.logger.debug(
      `${WalletController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WALLET_ACCOUNT)
  async createWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_WALLET_ACCOUNT}`,
      '',
      'createWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.createWalletAccount(message, key);
  }

  @MessagePattern(KT_GET_WALLET_ACCOUNT)
  async getWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_WALLET_ACCOUNT}`,
      '',
      'getWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.getWalletAccount(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_WALLET_ACCOUNT)
  async getZtrackingWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_WALLET_ACCOUNT}`,
      '',
      'getZtrackingWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.getZtrackingWalletAccount(message, key);
  }
}

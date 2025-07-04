import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { WalletAccountService } from './services/wallet-account.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('wallet')
export class WalletController {
  private logger = getLoggerConfig(WalletController.name);

  constructor(private readonly walletService: WalletAccountService) {
    this.logger.debug(
      `${WalletController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern('wallet.create')
  async create(@Payload() data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.walletService.create(data, key);
  }

  @MessagePattern('wallet.list')
  async list(@Payload() _data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.walletService.findAll(key);
  }
}

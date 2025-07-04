import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAccount } from '../../../entities/wallet_account.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletAccountService {
  private logger = getLoggerConfig(WalletAccountService.name);

  constructor(
    @InjectRepository(WalletAccount)
    private readonly walletRepo: Repository<WalletAccount>,
  ) {
    this.logger.debug(
      `${WalletAccountService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(account: Partial<WalletAccount>, traceId: string): Promise<WalletAccount> {
    const entity = this.walletRepo.create(account);
    await this.walletRepo.save(entity);
    this.logger.info('WalletAccount created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async findAll(traceId: string): Promise<WalletAccount[]> {
    const list = await this.walletRepo.find();
    this.logger.info(`Retrieved ${list.length} wallet accounts`, traceId, 'findAll', LogStreamLevel.DebugLight);
    return list;
  }
}

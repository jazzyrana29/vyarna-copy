import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAccount } from '../../../entities/wallet_account.entity';
import { ZtrackingWalletAccountService } from './ztracking-wallet-account.service';
import {
  CreateWalletAccountDto,
  GetWalletAccountsDto,
  GetZtrackingWalletAccountDto,
  WalletAccountDto,
  ZtrackingWalletAccountDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletAccountService {
  private logger = getLoggerConfig(WalletAccountService.name);

  constructor(
    @InjectRepository(WalletAccount)
    private readonly walletRepo: Repository<WalletAccount>,
    private readonly ztrackingWalletAccountService: ZtrackingWalletAccountService,
  ) {
    this.logger.debug(
      `${WalletAccountService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWalletAccount(
    account: CreateWalletAccountDto,
    traceId: string,
  ): Promise<WalletAccountDto> {
    const entity = this.walletRepo.create(account);
    await this.walletRepo.save(entity);
    this.logger.info('WalletAccount created', traceId, 'createWalletAccount', LogStreamLevel.ProdStandard);

    await this.ztrackingWalletAccountService.createZtrackingForWalletAccount(
      entity,
      traceId,
    );

    return entity;
  }

  async getWalletAccounts(
    _getDto: GetWalletAccountsDto,
    traceId: string,
  ): Promise<WalletAccountDto[]> {
    const list = await this.walletRepo.find();
    this.logger.info(`Retrieved ${list.length} wallet accounts`, traceId, 'getWalletAccounts', LogStreamLevel.DebugLight);
    return list;
  }

  async getZtrackingWalletAccount(
    getDto: GetZtrackingWalletAccountDto,
    traceId: string,
  ): Promise<ZtrackingWalletAccountDto[]> {
    return this.ztrackingWalletAccountService.getZtrackingForWalletAccount(
      getDto,
      traceId,
    );
  }
}

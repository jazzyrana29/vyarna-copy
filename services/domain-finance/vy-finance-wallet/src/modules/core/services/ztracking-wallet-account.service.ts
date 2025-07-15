import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { WalletAccount } from '../../../entities/wallet_account.entity';
import { ZtrackingWalletAccount } from '../../../entities/ztracking_wallet_account.entity';
import { GetZtrackingWalletAccountDto, ZtrackingWalletAccountDto } from 'ez-utils';

@Injectable()
export class ZtrackingWalletAccountService {
  private logger = getLoggerConfig(ZtrackingWalletAccountService.name);

  constructor(
    @InjectRepository(ZtrackingWalletAccount)
    private readonly walletRepo: Repository<ZtrackingWalletAccount>,
  ) {
    this.logger.debug(
      `${ZtrackingWalletAccountService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForWalletAccount(
    account: WalletAccount,
    traceId: string,
  ): Promise<ZtrackingWalletAccount> {
    const entity = await this.walletRepo.save(
      this.walletRepo.create({ ...account, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking wallet account saved in database`,
      traceId,
      'createZtrackingForWalletAccount',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForWalletAccount(
    { accountId = '' }: GetZtrackingWalletAccountDto,
    traceId: string,
  ): Promise<ZtrackingWalletAccountDto[]> {
    const entities = await this.walletRepo.find({ where: { accountId } });

    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${accountId}`,
        traceId,
        'getZtrackingForWalletAccount',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${accountId}`,
      );
    }

    this.logger.info(
      `${entities.length} ztracking wallet account found in database`,
      traceId,
      'getZtrackingForWalletAccount',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}

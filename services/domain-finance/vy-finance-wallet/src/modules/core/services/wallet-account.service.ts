import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAccount } from '../../../entities/wallet_account.entity';
import { ZtrackingWalletAccountService } from './ztracking-wallet-account.service';
import {
  CreateWalletAccountDto,
  GetOneWalletAccountDto,
  GetZtrackingWalletAccountDto,
  WalletAccountDto,
  ZtrackingWalletAccountDto,
  encodeKafkaMessage,
  KT_CREATED_WALLET_ACCOUNT,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
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
    createWalletAccountDto: CreateWalletAccountDto,
    traceId: string,
  ): Promise<WalletAccountDto> {
    const entity = this.walletRepo.create({
      ...createWalletAccountDto,
      balanceCents: 0,
    });
    await this.walletRepo.save(entity);
    this.logger.info(
      'WalletAccount created',
      traceId,
      'createWalletAccount',
      LogStreamLevel.ProdStandard,
    );

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_CREATED_WALLET_ACCOUNT,
      encodeKafkaMessage(WalletAccountService.name, {
        accountId: entity.accountId,
        traceId,
      }),
    );

    await this.ztrackingWalletAccountService.createZtrackingForWalletAccount(
      entity,
      traceId,
    );

    return entity;
  }

  async getWalletAccount(
    getOneWalletAccountDto: GetOneWalletAccountDto,
    traceId: string,
  ): Promise<WalletAccountDto | null> {
    const { accountId } = getOneWalletAccountDto;
    const entity = await this.walletRepo.findOne({ where: { accountId } });
    if (entity) {
      this.logger.info(
        'Retrieved wallet account',
        traceId,
        'getWalletAccount',
        LogStreamLevel.DebugLight,
      );
    } else {
      this.logger.warn(
        `Wallet account not found => ${accountId}`,
        traceId,
        'getWalletAccount',
        LogStreamLevel.DebugLight,
      );
    }
    return entity;
  }

  async getZtrackingWalletAccount(
    getZtrackingWalletAccountDto: GetZtrackingWalletAccountDto,
    traceId: string,
  ): Promise<ZtrackingWalletAccountDto[]> {
    return this.ztrackingWalletAccountService.getZtrackingForWalletAccount(
      getZtrackingWalletAccountDto,
      traceId,
    );
  }
}

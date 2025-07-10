import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAccount } from '../../../entities/wallet_account.entity';
import { LedgerTransaction } from '../../../entities/ledger_transaction.entity';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  encodeKafkaMessage,
  RecordTransactionDto,
  KT_RECORDED_TRANSACTION,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class LedgerService {
  private logger = getLoggerConfig(LedgerService.name);

  constructor(
    @InjectRepository(WalletAccount)
    private readonly walletRepo: Repository<WalletAccount>,
    @InjectRepository(LedgerTransaction)
    private readonly ledgerRepo: Repository<LedgerTransaction>,
  ) {
    this.logger.debug(
      `${LedgerService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async recordTransaction(
    recordTransactionDto: RecordTransactionDto,
    traceId: string,
  ): Promise<LedgerTransaction> {
    return this.walletRepo.manager.transaction(async (manager) => {
      const account = await manager.findOne(WalletAccount, { where: { accountId: recordTransactionDto.accountId } });
      if (!account) throw new Error('Account not found');
      account.balanceCents += recordTransactionDto.amountCents;
      await manager.save(WalletAccount, account);
      const tx = manager.create(LedgerTransaction, {
        accountId: recordTransactionDto.accountId,
        amountCents: recordTransactionDto.amountCents,
        transactionType: recordTransactionDto.transactionType,
        relatedType: recordTransactionDto.relatedType,
        relatedId: recordTransactionDto.relatedId,
        description: recordTransactionDto.description,
        status: 'COMPLETED',
      });
      const saved = await manager.save(LedgerTransaction, tx);
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_RECORDED_TRANSACTION,
        encodeKafkaMessage(LedgerService.name, { transactionId: saved.transactionId, traceId }),
      );
      this.logger.info('Ledger transaction recorded', traceId, 'recordTransaction', LogStreamLevel.ProdStandard);
      return saved;
    });
  }
}

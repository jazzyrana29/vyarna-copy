import { PickType } from '@nestjs/swagger';
import { LedgerTransactionDto } from './ledger-transaction.dto';

export class RecordTransactionDto extends PickType(LedgerTransactionDto, [
  'accountId',
  'amountCents',
  'transactionType',
  'relatedType',
  'relatedId',
  'description',
] as const) {}

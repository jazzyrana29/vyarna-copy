import { LedgerTransactionDto } from './ledger-transaction.dto';
declare const RecordTransactionDto_base: import("@nestjs/common").Type<Pick<LedgerTransactionDto, "description" | "amountCents" | "accountId" | "transactionType" | "relatedType" | "relatedId">>;
export declare class RecordTransactionDto extends RecordTransactionDto_base {
}
export {};

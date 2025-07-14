"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ledger_transaction_dto_1 = require("./ledger-transaction.dto");
class RecordTransactionDto extends (0, swagger_1.PickType)(ledger_transaction_dto_1.LedgerTransactionDto, [
    'accountId',
    'amountCents',
    'transactionType',
    'relatedType',
    'relatedId',
    'description',
]) {
}
exports.RecordTransactionDto = RecordTransactionDto;
//# sourceMappingURL=record-transaction.dto.js.map
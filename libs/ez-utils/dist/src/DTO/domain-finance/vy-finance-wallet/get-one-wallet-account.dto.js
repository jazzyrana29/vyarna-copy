"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneWalletAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wallet_account_dto_1 = require("./wallet-account.dto");
class GetOneWalletAccountDto extends (0, swagger_1.PickType)(wallet_account_dto_1.WalletAccountDto, [
    'accountId',
]) {
}
exports.GetOneWalletAccountDto = GetOneWalletAccountDto;
//# sourceMappingURL=get-one-wallet-account.dto.js.map
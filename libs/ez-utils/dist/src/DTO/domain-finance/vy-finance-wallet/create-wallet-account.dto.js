"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWalletAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wallet_account_dto_1 = require("./wallet-account.dto");
class CreateWalletAccountDto extends (0, swagger_1.PickType)(wallet_account_dto_1.WalletAccountDto, [
    'personId',
    'type',
    'currency',
]) {
}
exports.CreateWalletAccountDto = CreateWalletAccountDto;
//# sourceMappingURL=create-wallet-account.dto.js.map
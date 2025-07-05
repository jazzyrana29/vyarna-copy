"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZtrackingWalletAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingWalletAccountDto {
}
exports.ZtrackingWalletAccountDto = ZtrackingWalletAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Version identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWalletAccountDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Account identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWalletAccountDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Person identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWalletAccountDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Balance in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingWalletAccountDto.prototype, "balanceCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Account type', enum: ['PROVIDER', 'CONSUMER', 'AFFILIATE', 'INTERNAL'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingWalletAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Currency code' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingWalletAccountDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWalletAccountDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWalletAccountDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Version date' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWalletAccountDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-wallet-account.dto.js.map
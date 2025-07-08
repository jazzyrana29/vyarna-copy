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
exports.ProviderPayoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProviderPayoutDto {
}
exports.ProviderPayoutDto = ProviderPayoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Provider payout identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "payoutId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Provider identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet account identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Period start', type: String, format: 'date' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "periodStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Period end', type: String, format: 'date' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "periodEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProviderPayoutDto.prototype, "amountCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payout status', enum: ['SCHEDULED', 'PROCESSING', 'PAID', 'FAILED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProviderPayoutDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scheduled time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProviderPayoutDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Paid time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProviderPayoutDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProviderPayoutDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProviderPayoutDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=provider-payout.dto.js.map
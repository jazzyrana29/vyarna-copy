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
exports.AffiliateCommissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AffiliateCommissionDto {
}
exports.AffiliateCommissionDto = AffiliateCommissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commission identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateCommissionDto.prototype, "commissionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Partner identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateCommissionDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet account identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateCommissionDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateCommissionDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AffiliateCommissionDto.prototype, "amountCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commission status', enum: ['PENDING', 'PAID', 'FAILED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AffiliateCommissionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commission earned time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AffiliateCommissionDto.prototype, "earnedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Paid time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AffiliateCommissionDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AffiliateCommissionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AffiliateCommissionDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=affiliate-commission.dto.js.map
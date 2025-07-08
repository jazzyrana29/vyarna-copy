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
exports.ConsumerRewardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ConsumerRewardDto {
}
exports.ConsumerRewardDto = ConsumerRewardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Consumer reward identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "rewardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Consumer identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "consumerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet account identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source type', enum: ['ORDER', 'REFERRAL', 'PROMOTION'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "sourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ConsumerRewardDto.prototype, "amountCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reward status', enum: ['ISSUED', 'REDEEMED', 'EXPIRED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumerRewardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Issued time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ConsumerRewardDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Redeemed time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ConsumerRewardDto.prototype, "redeemedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Expiration time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ConsumerRewardDto.prototype, "expiredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ConsumerRewardDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ConsumerRewardDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=consumer-reward.dto.js.map
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
exports.RefundDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RefundDto {
}
exports.RefundDto = RefundDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Refund identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RefundDto.prototype, "refundId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated payment intent id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RefundDto.prototype, "paymentIntentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'External id for idempotency' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RefundDto.prototype, "amountCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Currency code' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the refund', enum: ['PENDING', 'SUCCEEDED', 'FAILED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for the refund', required: false, enum: ['REQUESTED_BY_CUSTOMER', 'FRAUD', 'OTHER'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RefundDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RefundDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RefundDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=refund.dto.js.map

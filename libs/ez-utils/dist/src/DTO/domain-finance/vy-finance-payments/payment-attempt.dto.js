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
exports.PaymentAttemptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PaymentAttemptDto {
}
exports.PaymentAttemptDto = PaymentAttemptDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attempt identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PaymentAttemptDto.prototype, "attemptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated payment intent id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PaymentAttemptDto.prototype, "paymentIntentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sequential attempt number' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PaymentAttemptDto.prototype, "attemptNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the attempt', enum: ['PENDING', 'SUCCESS', 'FAILED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentAttemptDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Error code', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentAttemptDto.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Error message', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentAttemptDto.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gateway response', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PaymentAttemptDto.prototype, "gatewayResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PaymentAttemptDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PaymentAttemptDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=payment-attempt.dto.js.map
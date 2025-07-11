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
exports.ConfirmedPaymentIntentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ConfirmedPaymentIntentDto {
}
exports.ConfirmedPaymentIntentDto = ConfirmedPaymentIntentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the confirmation was successful' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfirmedPaymentIntentDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Internal payment intent identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConfirmedPaymentIntentDto.prototype, "paymentIntentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Final status of the payment intent',
        enum: [
            'REQUIRES_PAYMENT_METHOD',
            'REQUIRES_CONFIRMATION',
            'REQUIRES_ACTION',
            'REQUIRES_CAPTURE',
            'PROCESSING',
            'SUCCEEDED',
            'CANCELED',
            'FAILED',
        ],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmedPaymentIntentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Updated client secret' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmedPaymentIntentDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether further action is required' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfirmedPaymentIntentDto.prototype, "requiresAction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Next action information from Stripe' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ConfirmedPaymentIntentDto.prototype, "nextAction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Stripe error code when failed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmedPaymentIntentDto.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Stripe error message when failed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmedPaymentIntentDto.prototype, "errorMessage", void 0);
//# sourceMappingURL=confirmed-payment-intent.dto.js.map
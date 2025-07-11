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
exports.ConfirmPaymentIntentDto = exports.ShippingDto = exports.ShippingAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const payment_intent_dto_1 = require("./payment-intent.dto");
class ShippingAddressDto {
}
exports.ShippingAddressDto = ShippingAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street line for the address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "line1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City for the address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'State or province' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal or zip code' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ISO country code' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "country", void 0);
class ShippingDto {
}
exports.ShippingDto = ShippingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recipient name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShippingAddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShippingAddressDto),
    __metadata("design:type", ShippingAddressDto)
], ShippingDto.prototype, "address", void 0);
class ConfirmPaymentIntentDto extends (0, swagger_1.PickType)(payment_intent_dto_1.PaymentIntentDto, ['paymentIntentId']) {
}
exports.ConfirmPaymentIntentDto = ConfirmPaymentIntentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment method to use for confirmation' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmPaymentIntentDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Email address to send the receipt to',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ConfirmPaymentIntentDto.prototype, "receiptEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Return URL after additional auth' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmPaymentIntentDto.prototype, "returnUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether payment method is saved for future use',
        enum: ['off_session', 'on_session'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['off_session', 'on_session']),
    __metadata("design:type", String)
], ConfirmPaymentIntentDto.prototype, "setupFutureUsage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: ShippingDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShippingDto),
    __metadata("design:type", ShippingDto)
], ConfirmPaymentIntentDto.prototype, "shipping", void 0);
//# sourceMappingURL=confirm-payment-intent.dto.js.map
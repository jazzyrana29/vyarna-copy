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
exports.PaymentIntentCreatedDto = exports.AppliedCouponDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AppliedCouponDto {
}
exports.AppliedCouponDto = AppliedCouponDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coupon ID applied' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AppliedCouponDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID this coupon applied to' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AppliedCouponDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total discount amount in cents' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AppliedCouponDto.prototype, "discountAmount", void 0);
class PaymentIntentCreatedDto {
}
exports.PaymentIntentCreatedDto = PaymentIntentCreatedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Was the creation successful?' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PaymentIntentCreatedDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stripe client_secret for front-end confirm' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentIntentCreatedDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Internal payment intent UUID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PaymentIntentCreatedDto.prototype, "paymentIntentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [AppliedCouponDto],
        description: 'Coupons applied and their discount amounts',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppliedCouponDto),
    __metadata("design:type", Array)
], PaymentIntentCreatedDto.prototype, "appliedCoupons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Final amount charged (in cents)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PaymentIntentCreatedDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original amount before discounts (in cents)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PaymentIntentCreatedDto.prototype, "originalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unit for amount values, e.g. cents',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentIntentCreatedDto.prototype, "amountUnit", void 0);
//# sourceMappingURL=payment-intent-created.dto.js.map
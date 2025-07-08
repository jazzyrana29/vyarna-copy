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
exports.SubscriptionItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SubscriptionItemDto {
}
exports.SubscriptionItemDto = SubscriptionItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubscriptionItemDto.prototype, "subscriptionItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Subscription id", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubscriptionItemDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Variant id", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubscriptionItemDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quantity" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SubscriptionItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriptionItemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriptionItemDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=subscription-item.dto.js.map
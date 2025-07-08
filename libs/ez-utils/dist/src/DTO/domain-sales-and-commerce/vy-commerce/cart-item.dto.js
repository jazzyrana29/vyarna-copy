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
exports.CartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CartItemDto {
}
exports.CartItemDto = CartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CartItemDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Cart identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CartItemDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Variant identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CartItemDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quantity" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit price in cents" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CartItemDto.prototype, "unitPriceCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CartItemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CartItemDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=cart-item.dto.js.map
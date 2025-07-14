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
exports.ProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDto {
}
exports.ProductDto = ProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Whether product is active" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Price in cents" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "priceCents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Currency code" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "targetCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProductDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProductDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product.dto.js.map
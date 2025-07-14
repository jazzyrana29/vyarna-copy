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
exports.PromotionCodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PromotionCodeDto {
}
exports.PromotionCodeDto = PromotionCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PromotionCodeDto.prototype, "promoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Promotion code" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromotionCodeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Discount type", enum: ["PERCENTAGE", "AMOUNT"] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromotionCodeDto.prototype, "discountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Value of discount" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PromotionCodeDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Valid from", type: String, format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PromotionCodeDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Valid to", type: String, format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PromotionCodeDto.prototype, "validTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Maximum redemptions" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PromotionCodeDto.prototype, "maxRedemptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PromotionCodeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PromotionCodeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=promotion-code.dto.js.map
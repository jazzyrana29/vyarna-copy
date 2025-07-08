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
exports.AffiliateClickDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AffiliateClickDto {
}
exports.AffiliateClickDto = AffiliateClickDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "clickId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Affiliate partner id", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Person id", required: false, format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Cart id", required: false, format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "URL" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Referrer", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AffiliateClickDto.prototype, "referrer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Click time", type: String, format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AffiliateClickDto.prototype, "clickedAt", void 0);
//# sourceMappingURL=affiliate-click.dto.js.map
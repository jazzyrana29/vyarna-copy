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
exports.PhysicalAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const address_type_enum_1 = require("../../../enums/domain-person-and-identity/address-type.enum");
class PhysicalAddressDto {
}
exports.PhysicalAddressDto = PhysicalAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the physical address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "addressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the person this address belongs to",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of address",
        enum: address_type_enum_1.AddressType,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(address_type_enum_1.AddressType),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "addressType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "First line of the address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "addressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Second line of the address, if applicable",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "addressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "City of the address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "State or region of the address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Postal code of the address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Country of the address",
        type: String,
        required: true,
    }),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], PhysicalAddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether this address is the primary one",
        type: Boolean,
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PhysicalAddressDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the address record was created",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PhysicalAddressDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the address record was last updated",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PhysicalAddressDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=physical-address.dto.js.map
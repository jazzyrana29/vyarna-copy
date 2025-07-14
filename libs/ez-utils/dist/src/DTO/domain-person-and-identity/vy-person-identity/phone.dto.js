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
exports.PhoneDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const phone_type_enum_1 = require("../../../enums/domain-person-and-identity/phone-type.enum");
class PhoneDto {
}
exports.PhoneDto = PhoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the phone record",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PhoneDto.prototype, "phoneId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the person this phone belongs to",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PhoneDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of phone",
        enum: phone_type_enum_1.PhoneType,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(phone_type_enum_1.PhoneType),
    __metadata("design:type", String)
], PhoneDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Phone number in E.164 format",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsPhoneNumber)(null),
    __metadata("design:type", String)
], PhoneDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether the phone is verified",
        type: Boolean,
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PhoneDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether the phone is primary",
        type: Boolean,
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PhoneDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was created",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PhoneDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was last updated",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PhoneDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=phone.dto.js.map
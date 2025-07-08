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
exports.EmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EmailDto {
}
exports.EmailDto = EmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the email' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EmailDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifier of the related person' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EmailDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Verification status' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EmailDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Primary flag' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EmailDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EmailDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EmailDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=email.dto.js.map
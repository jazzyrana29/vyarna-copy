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
exports.IdentityVerificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const document_dto_1 = require("./document.dto");
const verification_status_enum_1 = require("../../../enums/domain-person-and-identity/verification-status.enum");
class IdentityVerificationDto {
}
exports.IdentityVerificationDto = IdentityVerificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the verification record",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "verificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the person being verified",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current status of the verification",
        enum: verification_status_enum_1.VerificationStatus,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(verification_status_enum_1.VerificationStatus),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the verification was submitted",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], IdentityVerificationDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the verification was reviewed",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], IdentityVerificationDto.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of documents associated with this verification",
        type: [document_dto_1.DocumentDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => document_dto_1.DocumentDto),
    __metadata("design:type", Array)
], IdentityVerificationDto.prototype, "documents", void 0);
//# sourceMappingURL=identity-verification.dto.js.map
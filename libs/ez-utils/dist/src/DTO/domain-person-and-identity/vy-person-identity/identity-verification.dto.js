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
exports.IdentityVerificationDto = exports.VerificationStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const document_dto_1 = require("./document.dto");
var VerificationStatusDto;
(function (VerificationStatusDto) {
    VerificationStatusDto["PENDING"] = "pending";
    VerificationStatusDto["APPROVED"] = "approved";
    VerificationStatusDto["REJECTED"] = "rejected";
})(VerificationStatusDto || (exports.VerificationStatusDto = VerificationStatusDto = {}));
class IdentityVerificationDto {
}
exports.IdentityVerificationDto = IdentityVerificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the verification' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "verificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Person related to the verification' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: VerificationStatusDto }),
    (0, class_validator_1.IsEnum)(VerificationStatusDto),
    __metadata("design:type", String)
], IdentityVerificationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], IdentityVerificationDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], IdentityVerificationDto.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [document_dto_1.DocumentDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], IdentityVerificationDto.prototype, "documents", void 0);
//# sourceMappingURL=identity-verification.dto.js.map
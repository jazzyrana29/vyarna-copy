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
exports.PersonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PersonDto {
}
exports.PersonDto = PersonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PersonDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier for the business unit the person belongs to",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PersonDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier for the root business unit the person belongs to",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PersonDto.prototype, "rootBusinessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Roles assigned to the person",
        type: [String],
    }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PersonDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Username of the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "First name of the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "nameFirst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Middle name of the person, if applicable",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "nameMiddle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last name of the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "nameLast", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Email of the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PersonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Password of the person",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Stripe customer id associated with the person",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "stripeCustomerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ActiveCampaign contact id associated with the person",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "activeCampaignId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the person is deleted",
        type: Boolean,
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PersonDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the person",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation date of the person",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PersonDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date the person was last updated",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PersonDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=person.dto.js.map
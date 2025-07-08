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
exports.ZtrackingPersonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingPersonDto {
}
exports.ZtrackingPersonDto = ZtrackingPersonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the ztracking version",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the operator",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "operatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Login identifier for the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "First name of the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "nameFirst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Middle name of the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "nameMiddle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last name of the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "nameLast", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Email address of the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Business unit identifier associated with the operator",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Roles assigned to the person in this version",
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ZtrackingPersonDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the operator is marked as deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ZtrackingPersonDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was created",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ZtrackingPersonDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingPersonDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Version date of the ztracking operator",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingPersonDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-person.dto.js.map
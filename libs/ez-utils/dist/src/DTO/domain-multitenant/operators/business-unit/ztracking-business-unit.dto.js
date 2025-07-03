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
exports.ZtrackingBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingBusinessUnitDto {
}
exports.ZtrackingBusinessUnitDto = ZtrackingBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the ztracking version",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingBusinessUnitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Business unit identifier associated with the ztracking entry",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the business unit",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingBusinessUnitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Parent business unit identifier, if applicable",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingBusinessUnitDto.prototype, "parentBusinessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the business unit is marked as deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ZtrackingBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was created",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ZtrackingBusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Version date of the ztracking business unit",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingBusinessUnitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-business-unit.dto.js.map
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
exports.BusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const business_unit_id_dto_1 = require("../../../shared-dtos/operators/business-unit-id.dto");
class BusinessUnitDto {
}
exports.BusinessUnitDto = BusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the business unit",
        required: false,
        example: "bu-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the business unit",
        maxLength: 50,
        required: false,
        example: "Sales Division",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BusinessUnitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier for the parent business unit",
        nullable: true,
        type: String,
        required: false,
        example: "",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BusinessUnitDto.prototype, "parentBusinessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of child business units",
        required: false,
        isArray: true,
        type: () => business_unit_id_dto_1.BusinessUnitIdDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => business_unit_id_dto_1.BusinessUnitIdDto),
    __metadata("design:type", Array)
], BusinessUnitDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the business unit is deleted",
        default: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the business unit",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the business unit was created",
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the business unit was last updated",
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BusinessUnitDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=business-unit.dto.js.map
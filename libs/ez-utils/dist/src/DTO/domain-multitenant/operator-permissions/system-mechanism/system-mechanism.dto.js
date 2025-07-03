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
exports.SystemMechanismDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mechanism_permit_dto_1 = require("../mechanism-permit/mechanism-permit.dto");
class SystemMechanismDto {
}
exports.SystemMechanismDto = SystemMechanismDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the system mechanism",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SystemMechanismDto.prototype, "systemMechanismId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the system mechanism",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemMechanismDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the system mechanism",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemMechanismDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the system mechanism is marked as deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SystemMechanismDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SystemMechanismDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was created",
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SystemMechanismDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SystemMechanismDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of mechanism permits related to this system mechanism",
        type: [mechanism_permit_dto_1.MechanismPermitDto],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => mechanism_permit_dto_1.MechanismPermitDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SystemMechanismDto.prototype, "mechanismPermits", void 0);
//# sourceMappingURL=system-mechanism.dto.js.map
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
exports.ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto {
}
exports.ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto = ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the Ztracking flow active status version",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The flow ID associated with this active status",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "flowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The wave type ID associated with this active status",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The business unit ID associated with this active status",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the Ztracking flow active status is marked as deleted",
        type: Boolean,
        default: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this active status",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the active status version was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-flow-is-active-for-wave-type-and-business-unit.dto.js.map
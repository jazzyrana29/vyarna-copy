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
exports.FlowIsActiveForWaveTypeAndBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const flow_dto_1 = require("../flow/flow.dto");
const wave_type_dto_1 = require("../wave-type/wave-type.dto");
class FlowIsActiveForWaveTypeAndBusinessUnitDto {
}
exports.FlowIsActiveForWaveTypeAndBusinessUnitDto = FlowIsActiveForWaveTypeAndBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the wave type",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Details of the associated wave type",
        type: () => wave_type_dto_1.WaveTypeDto,
    }),
    (0, class_transformer_1.Type)(() => wave_type_dto_1.WaveTypeDto),
    __metadata("design:type", wave_type_dto_1.WaveTypeDto)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "waveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the business unit",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the active flow",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "activeFlowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Details of the active flow",
        type: () => flow_dto_1.FlowDto,
    }),
    (0, class_transformer_1.Type)(() => flow_dto_1.FlowDto),
    __metadata("design:type", flow_dto_1.FlowDto)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "activeFlow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the flow is marked as deleted",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated the record",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FlowIsActiveForWaveTypeAndBusinessUnitDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=flow-is-active-for-wave-type-and-business-unit.dto.js.map
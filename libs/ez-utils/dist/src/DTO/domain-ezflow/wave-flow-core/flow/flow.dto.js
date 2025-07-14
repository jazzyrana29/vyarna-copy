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
exports.FlowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const wave_dto_1 = require("../wave/wave.dto");
const node_dto_1 = require("../node/node.dto");
const flow_is_active_for_wave_type_and_business_unit_dto_1 = require("../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto");
const wave_type_dto_1 = require("../wave-type/wave-type.dto");
class FlowDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(wave_type_dto_1.WaveTypeDto, ["waveTypeId"])) {
}
exports.FlowDto = FlowDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the flow",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowDto.prototype, "flowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Business Unit ID associated with the flow",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlowDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the flow",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "A brief description of the flow",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Wave type associated with the flow",
        type: String,
    }),
    __metadata("design:type", wave_type_dto_1.WaveTypeDto)
], FlowDto.prototype, "waveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of associations between flow and active flow for business units",
        type: [flow_is_active_for_wave_type_and_business_unit_dto_1.FlowIsActiveForWaveTypeAndBusinessUnitDto],
    }),
    __metadata("design:type", Array)
], FlowDto.prototype, "flowIsActiveForWaveTypeAndBusinessUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of nodes associated with the flow",
        type: [node_dto_1.NodeDto],
    }),
    __metadata("design:type", Array)
], FlowDto.prototype, "nodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of waves associated with the flow",
        type: [wave_dto_1.WaveDto],
    }),
    __metadata("design:type", Array)
], FlowDto.prototype, "waves", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the flow is marked as deleted",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FlowDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the flow is published",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FlowDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this flow",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the flow was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FlowDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the flow was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FlowDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "A JSON string storing the variables for the flow",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowDto.prototype, "variables", void 0);
//# sourceMappingURL=flow.dto.js.map
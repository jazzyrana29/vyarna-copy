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
exports.GetExecuteWaveInputPayloadResponseDto = exports.VariableContextDto = exports.AvailableOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const execute_wave_dto_1 = require("../wave/execute-wave.dto");
class AvailableOutputDto {
}
exports.AvailableOutputDto = AvailableOutputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the action producing these outputs",
        example: "10758f3c-a98a-4454-ac5c-57f4beaff2f5",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AvailableOutputDto.prototype, "actionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of the action producing these outputs",
        example: "UpdateUserData",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AvailableOutputDto.prototype, "actionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Optional human-readable name of the action",
        example: "Save Export URL",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AvailableOutputDto.prototype, "actionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of output property names this action produces",
        example: ["updatedUserData"],
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], AvailableOutputDto.prototype, "outputNames", void 0);
class VariableContextDto {
}
exports.VariableContextDto = VariableContextDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the variable (evaluationVariableId or actionVariableId)",
        example: "7e782599-469c-4313-a478-2f060756fda3",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], VariableContextDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Kind of variable this is",
        example: "actionVariable",
        enum: ["evaluationVariable", "actionVariable"],
    }),
    (0, class_validator_1.IsIn)(["evaluationVariable", "actionVariable"]),
    __metadata("design:type", String)
], VariableContextDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Logical name of the variable",
        example: "updatedUserData",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VariableContextDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "For each direct predecessor action, the outputs available to fill this variable",
        type: () => AvailableOutputDto,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AvailableOutputDto),
    __metadata("design:type", Array)
], VariableContextDto.prototype, "availableOutputs", void 0);
class GetExecuteWaveInputPayloadResponseDto {
}
exports.GetExecuteWaveInputPayloadResponseDto = GetExecuteWaveInputPayloadResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The core execution payload",
        type: () => execute_wave_dto_1.ExecuteWaveDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => execute_wave_dto_1.ExecuteWaveDto),
    __metadata("design:type", execute_wave_dto_1.ExecuteWaveDto)
], GetExecuteWaveInputPayloadResponseDto.prototype, "executeWave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Metadata for each variable explaining which prior-action outputs it can consume",
        type: () => VariableContextDto,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VariableContextDto),
    __metadata("design:type", Array)
], GetExecuteWaveInputPayloadResponseDto.prototype, "variableContexts", void 0);
//# sourceMappingURL=get-execute-wave-input-payload-response.dto.js.map
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
exports.ExecuteWaveDto = exports.InputVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class InputVariableDto {
}
exports.InputVariableDto = InputVariableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Variable name",
        example: "threshold",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InputVariableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Variable value",
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], InputVariableDto.prototype, "value", void 0);
class ExecuteWaveDto {
}
exports.ExecuteWaveDto = ExecuteWaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the wave type to execute",
        example: "2a3b4c5d-678e-90fa-bcde-1234567890ab",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ExecuteWaveDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the business unit",
        example: "3f4e5d6c-789a-01bc-def2-34567890abcd",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ExecuteWaveDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Array of input variables",
        isArray: true,
        type: () => InputVariableDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InputVariableDto),
    __metadata("design:type", Array)
], ExecuteWaveDto.prototype, "inputVariables", void 0);
//# sourceMappingURL=execute-wave.dto.js.map
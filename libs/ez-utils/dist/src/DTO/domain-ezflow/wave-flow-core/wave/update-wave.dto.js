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
exports.UpdateWaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_dto_1 = require("./wave.dto");
const class_validator_1 = require("class-validator");
class UpdateWaveDto extends (0, swagger_1.PickType)(wave_dto_1.WaveDto, [
    "waveId",
    "executionFlowId",
    "executionStartDate",
    "executionEndDate",
    "waveStatus",
    "updatedBy",
]) {
}
exports.UpdateWaveDto = UpdateWaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ID of the wave type",
        example: "9ecff91c-deaf-4a8d-a3f7-c8151f25e187",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateWaveDto.prototype, "waveTypeId", void 0);
//# sourceMappingURL=update-wave.dto.js.map
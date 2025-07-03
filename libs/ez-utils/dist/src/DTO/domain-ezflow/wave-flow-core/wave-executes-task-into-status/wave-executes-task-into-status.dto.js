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
exports.WaveExecutesTaskIntoStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const task_status_dto_1 = require("../task-status/task-status.dto");
class WaveExecutesTaskIntoStatusDto {
}
exports.WaveExecutesTaskIntoStatusDto = WaveExecutesTaskIntoStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task status execution",
        required: false,
        example: "wetis-1234",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WaveExecutesTaskIntoStatusDto.prototype, "taskStatusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Details of the task status",
        type: () => task_status_dto_1.TaskStatusDto,
        example: {},
    }),
    (0, class_transformer_1.Type)(() => task_status_dto_1.TaskStatusDto),
    __metadata("design:type", task_status_dto_1.TaskStatusDto)
], WaveExecutesTaskIntoStatusDto.prototype, "taskStatus", void 0);
//# sourceMappingURL=wave-executes-task-into-status.dto.js.map
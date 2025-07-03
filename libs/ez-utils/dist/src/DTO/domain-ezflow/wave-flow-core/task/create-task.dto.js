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
exports.CreateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
const class_validator_1 = require("class-validator");
class CreateTaskDto extends (0, swagger_1.PickType)(task_dto_1.TaskDto, [
    "dateStart",
    "dateEnd",
    "updatedBy",
]) {
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Node associated with the task",
        example: "b1dc8009-3c2f-41b3-a374-ebbfe6c87852",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Node exit from which the task is executed",
        example: "e37e793d-cbf3-40b6-aa0b-99cd4f84963b",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "isExecutedFromId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current status of the task",
        example: "b367d977-70a8-4e1b-8f55-d2ac3809712a",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskStatusId", void 0);
//# sourceMappingURL=create-task.dto.js.map
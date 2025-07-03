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
exports.InputValueTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const task_types_receive_input_value_type_dto_1 = require("../task-types-receive-input-value-type/task-types-receive-input-value-type.dto");
const task_has_received_input_value_of_type_dto_1 = require("../task-has-received-input-value-of-type/task-has-received-input-value-of-type.dto");
class InputValueTypeDto {
}
exports.InputValueTypeDto = InputValueTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the input value type",
        required: false,
        example: "ivt-1234",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InputValueTypeDto.prototype, "inputValueTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the input value type",
        maxLength: 50,
        required: true,
        example: "Text",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputValueTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the input value type",
        maxLength: 500,
        required: true,
        example: "A type representing textual input values",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputValueTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of task type received input value types",
        required: false,
        isArray: true,
        type: () => task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto),
    __metadata("design:type", Array)
], InputValueTypeDto.prototype, "taskTypeReceivesInputValueTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Task type that receives the input value type",
        required: true,
        type: () => task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto),
    __metadata("design:type", task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto)
], InputValueTypeDto.prototype, "taskTypeReceivesInputValueType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the input value type is deleted",
        default: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InputValueTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the input value type",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputValueTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the input value type was created",
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InputValueTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the input value type was last updated",
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InputValueTypeDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of task has received input values types associated",
        required: false,
        isArray: true,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => task_has_received_input_value_of_type_dto_1.TaskHasReceiveInputValueOfTypeDto),
    __metadata("design:type", Array)
], InputValueTypeDto.prototype, "taskHasReceiveInputValuesOfType", void 0);
//# sourceMappingURL=input-value-type.dto.js.map
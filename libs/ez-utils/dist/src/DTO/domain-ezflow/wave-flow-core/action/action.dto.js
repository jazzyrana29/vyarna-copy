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
exports.ActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const action_variable_dto_1 = require("./action-variable.dto");
class ActionDto {
}
exports.ActionDto = ActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique ID of the action",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActionDto.prototype, "actionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the action (e.g. "SendEmail", "SendSMS", etc.)',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActionDto.prototype, "actionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Optional name for the action",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Optional description for the action (up to 500 chars)",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The node ID if the action is linked to a node",
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActionDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Marks if the action is logically deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ActionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the user who last updated this action",
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the action was created",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the action was last updated",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of action variables associated with the action",
        type: [action_variable_dto_1.ActionVariableDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => action_variable_dto_1.ActionVariableDto),
    __metadata("design:type", Array)
], ActionDto.prototype, "actionVariables", void 0);
//# sourceMappingURL=action.dto.js.map
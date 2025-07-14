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
exports.NodeExitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const node_dto_1 = require("../node/node.dto");
const node_exit_type_dto_1 = require("../node-exit-type/node-exit-type.dto");
const filter_dto_1 = require("../filter/filter.dto");
const class_transformer_1 = require("class-transformer");
const task_dto_1 = require("../task/task.dto");
class NodeExitDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(node_exit_type_dto_1.NodeExitTypeDto, ["nodeExitTypeId"])) {
}
exports.NodeExitDto = NodeExitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the node exit",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeExitDto.prototype, "nodeExitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The source node ID from which this exit originates",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeExitDto.prototype, "sourceNodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The source node object",
        type: () => node_dto_1.NodeDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => node_dto_1.NodeDto),
    __metadata("design:type", node_dto_1.NodeDto)
], NodeExitDto.prototype, "sourceNode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The target node ID to which this exit leads (if any)",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeExitDto.prototype, "targetNodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The target node object",
        type: () => node_dto_1.NodeDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => node_dto_1.NodeDto),
    __metadata("design:type", node_dto_1.NodeDto)
], NodeExitDto.prototype, "targetNode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The node exit type associated with this exit",
        type: () => node_exit_type_dto_1.NodeExitTypeDto,
    }),
    (0, class_transformer_1.Type)(() => node_exit_type_dto_1.NodeExitTypeDto),
    __metadata("design:type", node_exit_type_dto_1.NodeExitTypeDto)
], NodeExitDto.prototype, "nodeExitType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of tasks executed from this exit",
        required: false,
        isArray: true,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => task_dto_1.TaskDto),
    __metadata("design:type", Array)
], NodeExitDto.prototype, "executedTasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The filter ID associated with this exit",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeExitDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The filter associated with this exit",
        type: () => filter_dto_1.FilterDto,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => filter_dto_1.FilterDto),
    __metadata("design:type", filter_dto_1.FilterDto)
], NodeExitDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the node exit is marked as deleted",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NodeExitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this node exit",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeExitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the node exit was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeExitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the node exit was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeExitDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=node-exit.dto.js.map
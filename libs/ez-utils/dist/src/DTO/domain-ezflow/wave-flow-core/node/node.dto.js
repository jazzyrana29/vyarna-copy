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
exports.NodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const flow_dto_1 = require("../flow/flow.dto");
const node_exit_dto_1 = require("../node-exit/node-exit.dto");
const node_type_dto_1 = require("../node-type/node-type.dto");
const class_transformer_1 = require("class-transformer");
const manifold_dto_1 = require("../manifold/manifold.dto");
const action_dto_1 = require("../action/action.dto");
const task_dto_1 = require("../task/task.dto");
class NodeDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(flow_dto_1.FlowDto, ["flowId"]), (0, swagger_1.PickType)(node_type_dto_1.NodeTypeDto, ["nodeTypeId"])) {
}
exports.NodeDto = NodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the node",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the node",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The X coordinate of the node position",
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NodeDto.prototype, "positionX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The Y coordinate of the node position",
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NodeDto.prototype, "positionY", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The flow associated with this node",
        type: () => flow_dto_1.FlowDto,
    }),
    (0, class_transformer_1.Type)(() => flow_dto_1.FlowDto),
    __metadata("design:type", flow_dto_1.FlowDto)
], NodeDto.prototype, "flow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The node type associated with this node",
        type: () => node_type_dto_1.NodeTypeDto,
    }),
    (0, class_transformer_1.Type)(() => node_type_dto_1.NodeTypeDto),
    __metadata("design:type", node_type_dto_1.NodeTypeDto)
], NodeDto.prototype, "nodeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The manifold associated with this node",
        type: () => manifold_dto_1.ManifoldDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => manifold_dto_1.ManifoldDto),
    __metadata("design:type", manifold_dto_1.ManifoldDto)
], NodeDto.prototype, "manifold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the associated manifold",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The action associated with this node",
        type: () => action_dto_1.ActionDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => action_dto_1.ActionDto),
    __metadata("design:type", action_dto_1.ActionDto)
], NodeDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the associated action",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeDto.prototype, "actionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of node exits associated with the node",
        type: [node_exit_dto_1.NodeExitDto],
        default: [],
    }),
    __metadata("design:type", Array)
], NodeDto.prototype, "nodeExits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of node exits (inputs) that enter into this node",
        type: [node_exit_dto_1.NodeExitDto],
        default: [],
    }),
    (0, class_transformer_1.Type)(() => node_exit_dto_1.NodeExitDto),
    __metadata("design:type", Array)
], NodeDto.prototype, "incomingExits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of tasks associated with this node",
        type: [task_dto_1.TaskDto],
        default: [],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => task_dto_1.TaskDto),
    __metadata("design:type", Array)
], NodeDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the node is marked as deleted",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NodeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this node",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the node was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the node was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=node.dto.js.map
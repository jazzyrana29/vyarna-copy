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
exports.NodeTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const node_dto_1 = require("../node/node.dto");
class NodeTypeDto {
}
exports.NodeTypeDto = NodeTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the node type",
        example: "456e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeTypeDto.prototype, "nodeTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the node type",
        example: "Processing Type",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the node type",
        example: "This node type is used for processing",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nodes associated with this node type",
        type: [node_dto_1.NodeDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NodeTypeDto.prototype, "nodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the node type is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NodeTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the node type",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NodeTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the node type was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the node type was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NodeTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=node-type.dto.js.map
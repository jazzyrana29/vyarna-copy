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
exports.NodeExitTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const node_exit_dto_1 = require("../node-exit/node-exit.dto");
class NodeExitTypeDto {
}
exports.NodeExitTypeDto = NodeExitTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the node exit type",
        required: false,
        example: "a26999f5-b708-11ef-823c-8693753db810",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NodeExitTypeDto.prototype, "nodeExitTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the node exit type",
        maxLength: 50,
        required: true,
        example: "Success",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeExitTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the node exit type",
        maxLength: 500,
        required: true,
        example: "A node exit type representing a successful operation",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeExitTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of node exits associated with this node exit type",
        required: false,
        isArray: true,
        type: () => node_exit_dto_1.NodeExitDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => node_exit_dto_1.NodeExitDto),
    __metadata("design:type", Array)
], NodeExitTypeDto.prototype, "nodeExits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the node exit type is deleted",
        default: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NodeExitTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the node exit type",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeExitTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the node exit type was created",
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], NodeExitTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the node exit type was last updated",
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], NodeExitTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=node-exit-type.dto.js.map
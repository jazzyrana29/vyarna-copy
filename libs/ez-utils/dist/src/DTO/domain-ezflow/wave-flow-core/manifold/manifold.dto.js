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
exports.ManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const filter_dto_1 = require("../filter/filter.dto");
const node_dto_1 = require("../node/node.dto");
const class_transformer_1 = require("class-transformer");
class ManifoldDto {
}
exports.ManifoldDto = ManifoldDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the manifold",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the manifold",
        example: "Product Filtering Manifold",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the manifold",
        example: "This manifold is used for filtering products based on certain conditions.",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Execution style of the manifold ("RUN All" or "STOP ON HIT")',
        example: "RUN All",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "executionStyle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Filters associated with this manifold",
        type: [filter_dto_1.FilterDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ManifoldDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Node associated with this manifold",
        type: node_dto_1.NodeDto,
        required: false,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => node_dto_1.NodeDto),
    __metadata("design:type", node_dto_1.NodeDto)
], ManifoldDto.prototype, "node", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the associated node",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the manifold is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ManifoldDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the manifold",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ManifoldDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the manifold was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ManifoldDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the manifold was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ManifoldDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=manifold.dto.js.map
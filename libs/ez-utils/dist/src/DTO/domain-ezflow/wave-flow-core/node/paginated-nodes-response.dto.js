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
exports.PaginatedNodesResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_dto_1 = require("./node.dto");
class PaginatedNodesResponseDto {
}
exports.PaginatedNodesResponseDto = PaginatedNodesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [node_dto_1.NodeDto], description: "List of node results" }),
    __metadata("design:type", Array)
], PaginatedNodesResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Maximum number of pages with the given pageSize; null if not paginated",
        example: 10,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedNodesResponseDto.prototype, "maxPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current page number; null if pagination is not used",
        example: 1,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedNodesResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The size of the page used in the query; null if pagination is not used",
        example: 25,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedNodesResponseDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the result was paginated or not",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginatedNodesResponseDto.prototype, "isPaginated", void 0);
//# sourceMappingURL=paginated-nodes-response.dto.js.map
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
exports.PaginatedTasksResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
class PaginatedTasksResponseDto {
}
exports.PaginatedTasksResponseDto = PaginatedTasksResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [task_dto_1.TaskDto],
        description: "List of task results",
    }),
    __metadata("design:type", Array)
], PaginatedTasksResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Maximum number of pages with the given pageSize; null if not paginated",
        example: 10,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedTasksResponseDto.prototype, "maxPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current page number; null if pagination is not used",
        example: 1,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedTasksResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The size of the page used in the query; null if pagination is not used",
        example: 25,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginatedTasksResponseDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the result was paginated or not",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginatedTasksResponseDto.prototype, "isPaginated", void 0);
//# sourceMappingURL=paginated-tasks-response.dto.js.map
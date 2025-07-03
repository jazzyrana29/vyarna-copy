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
exports.GetManyNodeTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_type_dto_1 = require("./node-type.dto");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const class_transformer_1 = require("class-transformer");
class GetManyNodeTypesDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(node_type_dto_1.NodeTypeDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
])) {
    constructor() {
        super(...arguments);
        this.sort = [];
    }
}
exports.GetManyNodeTypesDto = GetManyNodeTypesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
        type: pagination_dto_1.PaginationDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => pagination_dto_1.PaginationDto),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], GetManyNodeTypesDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of sorting instructions. Example: [{ by: "createdAt", order: "ASC" }]',
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetManyNodeTypesDto.prototype, "sort", void 0);
//# sourceMappingURL=get-many-node-types.dto.js.map
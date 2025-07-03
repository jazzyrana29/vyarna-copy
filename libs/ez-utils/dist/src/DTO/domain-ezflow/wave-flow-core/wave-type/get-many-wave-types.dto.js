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
exports.GetManyWaveTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const wave_type_dto_1 = require("./wave-type.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
class GetManyWaveTypesDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(wave_type_dto_1.WaveTypeDto, [
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
exports.GetManyWaveTypesDto = GetManyWaveTypesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Unique identifier for the wave type genre",
        example: "e3e70632-b0f9-42e0-a054-5924bff894c5",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetManyWaveTypesDto.prototype, "waveTypeGenreId", void 0);
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
], GetManyWaveTypesDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of sorting instructions.",
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetManyWaveTypesDto.prototype, "sort", void 0);
//# sourceMappingURL=get-many-wave-types.dto.js.map
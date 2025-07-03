"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneFilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_dto_1 = require("./filter-subset.dto");
class GetOneFilterSubsetDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(filter_subset_dto_1.FilterSubsetDto, ["filterSubsetId", "isDeleted"])) {
}
exports.GetOneFilterSubsetDto = GetOneFilterSubsetDto;
//# sourceMappingURL=get-one-filter-subset.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingFilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_dto_1 = require("./filter-subset.dto");
class GetZtrackingFilterSubsetDto extends (0, swagger_1.PickType)(filter_subset_dto_1.FilterSubsetDto, [
    "filterSubsetId",
]) {
}
exports.GetZtrackingFilterSubsetDto = GetZtrackingFilterSubsetDto;
//# sourceMappingURL=get-ztracking-filter-subset.dto.js.map
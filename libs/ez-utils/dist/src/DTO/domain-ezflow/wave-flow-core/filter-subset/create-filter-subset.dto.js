"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_dto_1 = require("./filter-subset.dto");
class CreateFilterSubsetDto extends (0, swagger_1.PickType)(filter_subset_dto_1.FilterSubsetDto, [
    "filterId",
    "filterSubsetInternalLogicalBinding",
    "nextFilterSubsetLogicalBinding",
    "updatedBy",
]) {
}
exports.CreateFilterSubsetDto = CreateFilterSubsetDto;
//# sourceMappingURL=create-filter-subset.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_dto_1 = require("./filter-subset.dto");
class DeleteFilterSubsetDto extends (0, swagger_1.PickType)(filter_subset_dto_1.FilterSubsetDto, [
    "filterSubsetId",
    "updatedBy",
]) {
}
exports.DeleteFilterSubsetDto = DeleteFilterSubsetDto;
//# sourceMappingURL=delete-filter-subset.dto.js.map
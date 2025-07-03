"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFilterSubsetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_item_dto_1 = require("./filter-subset-item.dto");
class CreateFilterSubsetItemDto extends (0, swagger_1.PickType)(filter_subset_item_dto_1.FilterSubsetItemDto, [
    "evaluationVariableId",
    "evaluationOperatorId",
    "evaluationValue",
    "filterSubsetId",
    "updatedBy",
]) {
}
exports.CreateFilterSubsetItemDto = CreateFilterSubsetItemDto;
//# sourceMappingURL=create-filter-subset-item.dto.js.map
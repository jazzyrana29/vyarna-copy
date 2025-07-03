"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilterSubsetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_item_dto_1 = require("./filter-subset-item.dto");
class DeleteFilterSubsetItemDto extends (0, swagger_1.PickType)(filter_subset_item_dto_1.FilterSubsetItemDto, [
    "filterSubsetItemId",
    "updatedBy",
]) {
}
exports.DeleteFilterSubsetItemDto = DeleteFilterSubsetItemDto;
//# sourceMappingURL=delete-filter-subset-item.dto.js.map
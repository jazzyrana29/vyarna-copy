"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneFilterSubsetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_item_dto_1 = require("./filter-subset-item.dto");
class GetOneFilterSubsetItemDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(filter_subset_item_dto_1.FilterSubsetItemDto, ["filterSubsetItemId", "isDeleted"])) {
}
exports.GetOneFilterSubsetItemDto = GetOneFilterSubsetItemDto;
//# sourceMappingURL=get-one-filter-subset-item.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingFilterSubsetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_subset_item_dto_1 = require("./filter-subset-item.dto");
class GetZtrackingFilterSubsetItemDto extends (0, swagger_1.PickType)(filter_subset_item_dto_1.FilterSubsetItemDto, ["filterSubsetItemId"]) {
}
exports.GetZtrackingFilterSubsetItemDto = GetZtrackingFilterSubsetItemDto;
//# sourceMappingURL=get-ztracking-filter-subset-item.dto.js.map
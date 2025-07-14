"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_dto_1 = require("./filter.dto");
class GetOneFilterDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(filter_dto_1.FilterDto, ["filterId", "filterName", "isDeleted"])) {
}
exports.GetOneFilterDto = GetOneFilterDto;
//# sourceMappingURL=get-one-filter.dto.js.map
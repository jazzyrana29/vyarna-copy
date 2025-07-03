"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_dto_1 = require("./filter.dto");
class GetZtrackingFilterDto extends (0, swagger_1.PickType)(filter_dto_1.FilterDto, ["filterId"]) {
}
exports.GetZtrackingFilterDto = GetZtrackingFilterDto;
//# sourceMappingURL=get-ztracking-filter.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_dto_1 = require("./filter.dto");
class CreateFilterDto extends (0, swagger_1.PickType)(filter_dto_1.FilterDto, [
    "filterName",
    "filterDescription",
    "isActive",
    "manifoldId",
    "updatedBy",
]) {
}
exports.CreateFilterDto = CreateFilterDto;
//# sourceMappingURL=create-filter.dto.js.map
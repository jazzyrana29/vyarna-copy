"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_dto_1 = require("./filter.dto");
class DeleteFilterDto extends (0, swagger_1.PickType)(filter_dto_1.FilterDto, [
    "filterId",
    "updatedBy",
]) {
}
exports.DeleteFilterDto = DeleteFilterDto;
//# sourceMappingURL=delete-filter.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const manifold_dto_1 = require("./manifold.dto");
class GetOneManifoldDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(manifold_dto_1.ManifoldDto, ["manifoldId", "name", "isDeleted"])) {
}
exports.GetOneManifoldDto = GetOneManifoldDto;
//# sourceMappingURL=get-one-manifold.dto.js.map
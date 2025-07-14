"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const manifold_dto_1 = require("./manifold.dto");
class GetZtrackingManifoldDto extends (0, swagger_1.PickType)(manifold_dto_1.ManifoldDto, [
    "manifoldId",
]) {
}
exports.GetZtrackingManifoldDto = GetZtrackingManifoldDto;
//# sourceMappingURL=get-ztracking-manifold.dto.js.map
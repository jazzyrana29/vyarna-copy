"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const manifold_dto_1 = require("./manifold.dto");
class DeleteManifoldDto extends (0, swagger_1.PickType)(manifold_dto_1.ManifoldDto, [
    "manifoldId",
    "updatedBy",
]) {
}
exports.DeleteManifoldDto = DeleteManifoldDto;
//# sourceMappingURL=delete-manifold.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const manifold_dto_1 = require("./manifold.dto");
class CreateManifoldDto extends (0, swagger_1.PickType)(manifold_dto_1.ManifoldDto, [
    "name",
    "description",
    "executionStyle",
    "nodeId",
]) {
}
exports.CreateManifoldDto = CreateManifoldDto;
//# sourceMappingURL=create-manifold.dto.js.map
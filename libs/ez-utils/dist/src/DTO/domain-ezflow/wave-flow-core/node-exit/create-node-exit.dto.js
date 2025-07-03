"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodeExitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_exit_dto_1 = require("./node-exit.dto");
class CreateNodeExitDto extends (0, swagger_1.PickType)(node_exit_dto_1.NodeExitDto, [
    "sourceNodeId",
    "targetNodeId",
    "nodeExitTypeId",
    "filterId",
    "updatedBy",
]) {
}
exports.CreateNodeExitDto = CreateNodeExitDto;
//# sourceMappingURL=create-node-exit.dto.js.map
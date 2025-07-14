"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNodeExitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_exit_dto_1 = require("./node-exit.dto");
class DeleteNodeExitDto extends (0, swagger_1.PickType)(node_exit_dto_1.NodeExitDto, [
    "nodeExitId",
    "updatedBy",
]) {
}
exports.DeleteNodeExitDto = DeleteNodeExitDto;
//# sourceMappingURL=delete-node-exit.dto.js.map
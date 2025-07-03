"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingNodeExitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_exit_dto_1 = require("./node-exit.dto");
class GetZtrackingNodeExitDto extends (0, swagger_1.PickType)(node_exit_dto_1.NodeExitDto, [
    "nodeExitId",
]) {
}
exports.GetZtrackingNodeExitDto = GetZtrackingNodeExitDto;
//# sourceMappingURL=get-ztracking-node-exit.dto.js.map
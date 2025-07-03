"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingNodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_dto_1 = require("./node.dto");
class GetZtrackingNodeDto extends (0, swagger_1.PickType)(node_dto_1.NodeDto, ["nodeId"]) {
}
exports.GetZtrackingNodeDto = GetZtrackingNodeDto;
//# sourceMappingURL=get-ztracking-node.dto.js.map
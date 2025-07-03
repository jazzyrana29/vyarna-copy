"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_dto_1 = require("./node.dto");
class DeleteNodeDto extends (0, swagger_1.PickType)(node_dto_1.NodeDto, ["nodeId", "updatedBy"]) {
}
exports.DeleteNodeDto = DeleteNodeDto;
//# sourceMappingURL=delete-node.dto.js.map
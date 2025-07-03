"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneNodeTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_type_dto_1 = require("./node-type.dto");
class GetOneNodeTypeDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(node_type_dto_1.NodeTypeDto, ["nodeTypeId", "name"])) {
}
exports.GetOneNodeTypeDto = GetOneNodeTypeDto;
//# sourceMappingURL=get-one-node-type.dto.js.map
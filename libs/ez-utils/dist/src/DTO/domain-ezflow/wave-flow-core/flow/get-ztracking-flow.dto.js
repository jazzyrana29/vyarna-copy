"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingFlowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_dto_1 = require("./flow.dto");
class GetZtrackingFlowDto extends (0, swagger_1.PickType)(flow_dto_1.FlowDto, ["flowId"]) {
}
exports.GetZtrackingFlowDto = GetZtrackingFlowDto;
//# sourceMappingURL=get-ztracking-flow.dto.js.map
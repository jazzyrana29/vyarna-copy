"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneFlowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_dto_1 = require("./flow.dto");
class CloneFlowDto extends (0, swagger_1.PickType)(flow_dto_1.FlowDto, ["flowId"]) {
}
exports.CloneFlowDto = CloneFlowDto;
//# sourceMappingURL=clone-flow.dto.js.map
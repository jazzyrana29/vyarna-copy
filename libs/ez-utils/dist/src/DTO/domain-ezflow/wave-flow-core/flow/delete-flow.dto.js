"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFlowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_dto_1 = require("./flow.dto");
class DeleteFlowDto extends (0, swagger_1.PickType)(flow_dto_1.FlowDto, ["flowId", "updatedBy"]) {
}
exports.DeleteFlowDto = DeleteFlowDto;
//# sourceMappingURL=delete-flow.dto.js.map
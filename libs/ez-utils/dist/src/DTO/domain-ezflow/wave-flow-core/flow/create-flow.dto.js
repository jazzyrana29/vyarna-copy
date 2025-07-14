"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFlowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_dto_1 = require("./flow.dto");
class CreateFlowDto extends (0, swagger_1.PickType)(flow_dto_1.FlowDto, [
    "waveTypeId",
    "businessUnitId",
    "name",
    "description",
    "isPublished",
    "updatedBy",
]) {
}
exports.CreateFlowDto = CreateFlowDto;
//# sourceMappingURL=create-flow.dto.js.map
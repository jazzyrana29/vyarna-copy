"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const action_dto_1 = require("./action.dto");
class UpdateActionDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(action_dto_1.ActionDto, [
    "actionId",
    "actionType",
    "name",
    "description",
    "nodeId",
    "updatedBy",
    "isDeleted",
])) {
}
exports.UpdateActionDto = UpdateActionDto;
//# sourceMappingURL=update-action.dto.js.map
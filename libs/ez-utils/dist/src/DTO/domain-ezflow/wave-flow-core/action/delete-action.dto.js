"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const action_dto_1 = require("./action.dto");
class DeleteActionDto extends (0, swagger_1.PickType)(action_dto_1.ActionDto, [
    "actionId",
    "updatedBy",
]) {
}
exports.DeleteActionDto = DeleteActionDto;
//# sourceMappingURL=delete-action.dto.js.map
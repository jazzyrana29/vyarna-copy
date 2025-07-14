"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const action_dto_1 = require("./action.dto");
class GetZtrackingActionDto extends (0, swagger_1.PickType)(action_dto_1.ActionDto, [
    "actionId",
]) {
}
exports.GetZtrackingActionDto = GetZtrackingActionDto;
//# sourceMappingURL=get-ztracking-action.dto.js.map
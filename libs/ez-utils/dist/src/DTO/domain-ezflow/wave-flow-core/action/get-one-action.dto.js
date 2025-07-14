"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const action_dto_1 = require("./action.dto");
class GetOneActionDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(action_dto_1.ActionDto, ["actionId", "name", "isDeleted"])) {
}
exports.GetOneActionDto = GetOneActionDto;
//# sourceMappingURL=get-one-action.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInputValueTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const input_value_type_dto_1 = require("./input-value-type.dto");
class GetInputValueTypeDto extends (0, swagger_1.PickType)(input_value_type_dto_1.InputValueTypeDto, [
    "inputValueTypeId",
    "name",
    "isDeleted",
]) {
}
exports.GetInputValueTypeDto = GetInputValueTypeDto;
//# sourceMappingURL=get-input-value-type.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyInputValueTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const input_value_type_dto_1 = require("./input-value-type.dto");
class GetManyInputValueTypesDto extends (0, swagger_1.PickType)(input_value_type_dto_1.InputValueTypeDto, [
    "inputValueTypeId",
    "name",
]) {
}
exports.GetManyInputValueTypesDto = GetManyInputValueTypesDto;
//# sourceMappingURL=get-many-input-value-types.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const person_dto_1 = require("./person.dto");
class CreatePersonDto extends (0, swagger_1.PickType)(person_dto_1.PersonDto, [
    "businessUnitId",
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLast",
    "email",
    "password",
    "roles",
    "updatedBy",
]) {
}
exports.CreatePersonDto = CreatePersonDto;
//# sourceMappingURL=create-person.dto.js.map
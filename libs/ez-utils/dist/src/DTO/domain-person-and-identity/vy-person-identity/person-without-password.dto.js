"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonWithoutPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const person_dto_1 = require("./person.dto");
class PersonWithoutPasswordDto extends (0, swagger_1.OmitType)(person_dto_1.PersonDto, [
    "password",
]) {
}
exports.PersonWithoutPasswordDto = PersonWithoutPasswordDto;
//# sourceMappingURL=person-without-password.dto.js.map
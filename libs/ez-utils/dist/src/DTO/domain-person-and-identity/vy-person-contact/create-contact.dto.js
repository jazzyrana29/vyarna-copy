"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const contact_dto_1 = require("./contact.dto");
class CreateContactDto extends (0, swagger_1.PickType)(contact_dto_1.ContactDto, [
    'firstName',
    'lastName',
    'email',
]) {
}
exports.CreateContactDto = CreateContactDto;
//# sourceMappingURL=create-contact.dto.js.map
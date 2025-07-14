"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./email.dto");
class CreateEmailDto extends (0, swagger_1.PickType)(email_dto_1.EmailDto, [
    'personId',
    'email',
    'isPrimary',
]) {
}
exports.CreateEmailDto = CreateEmailDto;
//# sourceMappingURL=create-email.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./email.dto");
class UpdateEmailDto extends (0, swagger_1.PickType)(email_dto_1.EmailDto, [
    'emailId',
    'isVerified',
    'isPrimary',
]) {
}
exports.UpdateEmailDto = UpdateEmailDto;
//# sourceMappingURL=update-email.dto.js.map
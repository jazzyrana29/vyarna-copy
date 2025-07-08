"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./email.dto");
class GetEmailDto extends (0, swagger_1.PickType)(email_dto_1.EmailDto, ['emailId']) {
}
exports.GetEmailDto = GetEmailDto;
//# sourceMappingURL=get-email.dto.js.map
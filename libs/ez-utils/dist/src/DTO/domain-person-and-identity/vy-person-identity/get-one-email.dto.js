"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./email.dto");
class GetOneEmailDto extends (0, swagger_1.PickType)(email_dto_1.EmailDto, ['emailId']) {
}
exports.GetOneEmailDto = GetOneEmailDto;
//# sourceMappingURL=get-one-email.dto.js.map
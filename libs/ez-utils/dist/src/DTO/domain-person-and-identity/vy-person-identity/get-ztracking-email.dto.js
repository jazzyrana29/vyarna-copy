"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./email.dto");
class GetZtrackingEmailDto extends (0, swagger_1.PickType)(email_dto_1.EmailDto, ['emailId']) {
}
exports.GetZtrackingEmailDto = GetZtrackingEmailDto;
//# sourceMappingURL=get-ztracking-email.dto.js.map
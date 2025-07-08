"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepRatingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_rating_dto_1 = require("./sleep-rating.dto");
class GetSleepRatingsDto extends (0, swagger_1.PickType)(sleep_rating_dto_1.SleepRatingDto, ['sessionId']) {
}
exports.GetSleepRatingsDto = GetSleepRatingsDto;
//# sourceMappingURL=get-sleep-ratings.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepRatingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_rating_dto_1 = require("./sleep-rating.dto");
class DeleteSleepRatingDto extends (0, swagger_1.PickType)(sleep_rating_dto_1.SleepRatingDto, ['ratingId']) {
}
exports.DeleteSleepRatingDto = DeleteSleepRatingDto;
//# sourceMappingURL=delete-sleep-rating.dto.js.map
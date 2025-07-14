"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManySymptomReportsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const symptom_report_dto_1 = require("./symptom-report.dto");
class GetManySymptomReportsDto extends (0, swagger_1.PickType)(symptom_report_dto_1.SymptomReportDto, ['babyId']) {
}
exports.GetManySymptomReportsDto = GetManySymptomReportsDto;
//# sourceMappingURL=get-many-symptom-reports.dto.js.map
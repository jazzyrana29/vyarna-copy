"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSymptomReportsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const symptom_report_dto_1 = require("./symptom-report.dto");
class GetSymptomReportsDto extends (0, swagger_1.PickType)(symptom_report_dto_1.SymptomReportDto, ['babyId']) {
}
exports.GetSymptomReportsDto = GetSymptomReportsDto;
//# sourceMappingURL=get-symptom-reports.dto.js.map
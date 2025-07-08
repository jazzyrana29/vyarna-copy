"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSymptomReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const symptom_report_dto_1 = require("./symptom-report.dto");
class CreateSymptomReportDto extends (0, swagger_1.PickType)(symptom_report_dto_1.SymptomReportDto, [
    'babyId',
    'personId',
    'symptomType',
    'severity',
    'eventTime',
    'notes',
]) {
}
exports.CreateSymptomReportDto = CreateSymptomReportDto;
//# sourceMappingURL=create-symptom-report.dto.js.map
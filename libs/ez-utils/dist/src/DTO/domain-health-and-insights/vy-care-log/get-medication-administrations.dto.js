"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMedicationAdministrationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const medication_administration_dto_1 = require("./medication-administration.dto");
class GetMedicationAdministrationsDto extends (0, swagger_1.PickType)(medication_administration_dto_1.MedicationAdministrationDto, ['babyId']) {
}
exports.GetMedicationAdministrationsDto = GetMedicationAdministrationsDto;
//# sourceMappingURL=get-medication-administrations.dto.js.map
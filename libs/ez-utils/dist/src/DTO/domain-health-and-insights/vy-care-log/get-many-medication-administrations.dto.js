"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyMedicationAdministrationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const medication_administration_dto_1 = require("./medication-administration.dto");
class GetManyMedicationAdministrationsDto extends (0, swagger_1.PickType)(medication_administration_dto_1.MedicationAdministrationDto, ['babyId']) {
}
exports.GetManyMedicationAdministrationsDto = GetManyMedicationAdministrationsDto;
//# sourceMappingURL=get-many-medication-administrations.dto.js.map
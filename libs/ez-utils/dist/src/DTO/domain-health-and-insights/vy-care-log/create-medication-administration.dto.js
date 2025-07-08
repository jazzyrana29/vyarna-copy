"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedicationAdministrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const medication_administration_dto_1 = require("./medication-administration.dto");
class CreateMedicationAdministrationDto extends (0, swagger_1.PickType)(medication_administration_dto_1.MedicationAdministrationDto, [
    'babyId',
    'personId',
    'babyMedicationId',
    'medicationName',
    'dosage',
    'unit',
    'route',
    'eventTime',
    'photoUrl',
    'notes',
]) {
}
exports.CreateMedicationAdministrationDto = CreateMedicationAdministrationDto;
//# sourceMappingURL=create-medication-administration.dto.js.map
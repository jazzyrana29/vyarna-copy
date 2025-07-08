import { PickType } from '@nestjs/swagger';
import { MedicationAdministrationDto } from './medication-administration.dto';

export class CreateMedicationAdministrationDto extends PickType(MedicationAdministrationDto, [
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
] as const) {}

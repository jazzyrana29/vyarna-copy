import { PickType } from '@nestjs/swagger';
import { MedicationAdministrationDto } from './medication-administration.dto';

export class GetZtrackingMedicationAdministrationDto extends PickType(
  MedicationAdministrationDto,
  ['medAdminId'] as const,
) {}

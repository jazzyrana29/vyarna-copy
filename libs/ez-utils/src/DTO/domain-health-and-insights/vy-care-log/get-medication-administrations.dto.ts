import { PickType } from '@nestjs/swagger';
import { MedicationAdministrationDto } from './medication-administration.dto';

export class GetMedicationAdministrationsDto extends PickType(MedicationAdministrationDto, ['babyId'] as const) {}

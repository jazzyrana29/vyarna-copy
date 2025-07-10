import { PickType } from '@nestjs/swagger';
import { MedicationAdministrationDto } from './medication-administration.dto';

export class GetManyMedicationAdministrationsDto extends PickType(MedicationAdministrationDto, ['babyId'] as const) {}

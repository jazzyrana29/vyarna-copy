import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateMedicationAdministrationDto } from 'ez-utils';

@Injectable()
export class ValidateCreateMedicationAdministrationDtoPipe implements PipeTransform {
  transform(value: CreateMedicationAdministrationDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, dosage, unit, route, eventTime } = value as any;
    if (!babyId || !personId || dosage === undefined || !unit || !route || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

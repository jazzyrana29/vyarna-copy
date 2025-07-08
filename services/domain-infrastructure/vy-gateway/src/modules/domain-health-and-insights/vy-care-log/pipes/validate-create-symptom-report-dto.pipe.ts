import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSymptomReportDto } from 'ez-utils';

@Injectable()
export class ValidateCreateSymptomReportDtoPipe implements PipeTransform {
  transform(value: CreateSymptomReportDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, symptomType, severity, eventTime } = value as any;
    if (!babyId || !personId || !symptomType || !severity || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

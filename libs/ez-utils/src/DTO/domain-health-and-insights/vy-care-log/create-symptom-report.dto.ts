import { PickType } from '@nestjs/swagger';
import { SymptomReportDto } from './symptom-report.dto';

export class CreateSymptomReportDto extends PickType(SymptomReportDto, [
  'babyId',
  'personId',
  'symptomType',
  'severity',
  'eventTime',
  'notes',
] as const) {}

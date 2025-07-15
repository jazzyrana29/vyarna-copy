import { PickType } from '@nestjs/swagger';
import { SymptomReportDto } from './symptom-report.dto';

export class GetZtrackingSymptomReportDto extends PickType(
  SymptomReportDto,
  ['symptomId'] as const,
) {}

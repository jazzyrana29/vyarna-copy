import { PickType } from '@nestjs/swagger';
import { SymptomReportDto } from './symptom-report.dto';

export class GetManySymptomReportsDto extends PickType(SymptomReportDto, ['babyId'] as const) {}

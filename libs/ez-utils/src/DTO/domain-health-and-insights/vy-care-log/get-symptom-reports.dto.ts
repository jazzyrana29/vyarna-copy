import { PickType } from '@nestjs/swagger';
import { SymptomReportDto } from './symptom-report.dto';

export class GetSymptomReportsDto extends PickType(SymptomReportDto, ['babyId'] as const) {}

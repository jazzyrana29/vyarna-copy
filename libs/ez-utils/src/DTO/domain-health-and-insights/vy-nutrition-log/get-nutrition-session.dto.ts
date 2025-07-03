import { PickType } from '@nestjs/swagger';
import { NutritionSessionDto } from './nutrition-session.dto';

export class GetNutritionSessionDto extends PickType(NutritionSessionDto, ['sessionId'] as const) {}

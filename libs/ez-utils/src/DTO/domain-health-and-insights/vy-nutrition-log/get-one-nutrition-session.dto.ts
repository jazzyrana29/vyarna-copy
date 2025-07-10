import { PickType } from '@nestjs/swagger';
import { NutritionSessionDto } from './nutrition-session.dto';

export class GetOneNutritionSessionDto extends PickType(NutritionSessionDto, ['sessionId'] as const) {}

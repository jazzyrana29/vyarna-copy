import { PickType } from '@nestjs/swagger';
import { NutritionSessionDto } from './nutrition-session.dto';

export class GetZtrackingNutritionSessionDto extends PickType(NutritionSessionDto, ['sessionId'] as const) {}

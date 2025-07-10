import { PickType } from '@nestjs/swagger';
import { NutritionSessionDto } from './nutrition-session.dto';

export class CreateNutritionSessionDto extends PickType(NutritionSessionDto, [
  'milkGiverId',
  'babyId',
  'type',
] as const) {}

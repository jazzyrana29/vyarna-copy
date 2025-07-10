import { PickType } from '@nestjs/swagger';
import { DiaperChangeDto } from './diaper-change.dto';

export class GetManyDiaperChangesDto extends PickType(DiaperChangeDto, ['babyId'] as const) {}

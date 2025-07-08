import { PickType } from '@nestjs/swagger';
import { InternalChargeDto } from './internal-charge.dto';

export class CreateInternalChargeDto extends PickType(InternalChargeDto, [
  'accountId',
  'amountCents',
  'description',
] as const) {}

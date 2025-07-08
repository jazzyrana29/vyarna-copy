import { PickType } from '@nestjs/swagger';
import { AffiliateCommissionDto } from './affiliate-commission.dto';

export class CreateAffiliateCommissionDto extends PickType(AffiliateCommissionDto, [
  'partnerId',
  'accountId',
  'orderId',
  'amountCents',
] as const) {}

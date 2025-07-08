import { PickType } from '@nestjs/swagger';
import { ProviderPayoutDto } from './provider-payout.dto';

export class ScheduleProviderPayoutDto extends PickType(ProviderPayoutDto, [
  'providerId',
  'accountId',
  'periodStart',
  'periodEnd',
  'amountCents',
] as const) {}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ScheduleProviderPayoutDto } from 'ez-utils';

@Injectable()
export class ValidateScheduleProviderPayoutDtoPipe implements PipeTransform {
  transform(value: ScheduleProviderPayoutDto, metadata: ArgumentMetadata) {
    const { providerId, accountId, periodStart, periodEnd, amountCents } = value as any;
    if (!providerId || !accountId || !periodStart || !periodEnd || !amountCents) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CancelSubscriptionDto } from 'ez-utils';

@Injectable()
export class ValidateCancelSubscriptionDtoPipe implements PipeTransform {
  transform(value: CancelSubscriptionDto, _metadata: ArgumentMetadata) {
    if (!(value as any).subscriptionId) {
      throw new BadRequestException('subscriptionId is required');
    }
    return value;
  }
}

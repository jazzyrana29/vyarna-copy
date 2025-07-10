import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DeleteSubscriptionDto } from 'ez-utils';

@Injectable()
export class ValidateCancelSubscriptionDtoPipe implements PipeTransform {
  transform(value: DeleteSubscriptionDto, _metadata: ArgumentMetadata) {
    if (!(value as any).subscriptionId) {
      throw new BadRequestException('subscriptionId is required');
    }
    return value;
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetSubscriptionDto } from 'ez-utils';

@Injectable()
export class ValidateGetSubscriptionDtoPipe implements PipeTransform {
  transform(value: GetSubscriptionDto, _metadata: ArgumentMetadata) {
    if (!(value as any).subscriptionId) {
      throw new BadRequestException('subscriptionId is required');
    }
    return value;
  }
}

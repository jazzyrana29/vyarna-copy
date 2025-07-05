import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePaymentIntentDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePaymentIntentDtoPipe implements PipeTransform {
  transform(value: CreatePaymentIntentDto, metadata: ArgumentMetadata) {
    const { amountCents, currency, orderId, subscriptionId } = value as any;
    if (!amountCents || !currency || (!orderId && !subscriptionId)) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

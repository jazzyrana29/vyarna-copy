import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConfirmPaymentIntentDto } from 'ez-utils';

@Injectable()
export class ValidateConfirmPaymentIntentDtoPipe implements PipeTransform {
  transform(value: ConfirmPaymentIntentDto, metadata: ArgumentMetadata) {
    if (!value.paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    if (!value.paymentMethodId) {
      throw new BadRequestException('paymentMethodId is required');
    }
    return value;
  }
}

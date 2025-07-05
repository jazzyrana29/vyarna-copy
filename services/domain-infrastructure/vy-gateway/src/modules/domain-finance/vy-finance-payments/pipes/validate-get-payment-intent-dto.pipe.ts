import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetPaymentIntentDto } from 'ez-utils';

@Injectable()
export class ValidateGetPaymentIntentDtoPipe implements PipeTransform {
  transform(value: GetPaymentIntentDto, metadata: ArgumentMetadata) {
    if (!value.paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    return value;
  }
}

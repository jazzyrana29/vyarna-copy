import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetPaymentIntentStatusDto } from 'ez-utils';

@Injectable()
export class ValidateGetPaymentIntentStatusDtoPipe implements PipeTransform {
  transform(value: GetPaymentIntentStatusDto, metadata: ArgumentMetadata) {
    if (!value.paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    return value;
  }
}

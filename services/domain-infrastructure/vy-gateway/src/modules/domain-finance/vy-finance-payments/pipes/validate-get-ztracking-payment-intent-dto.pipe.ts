import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetZtrackingPaymentIntentDto } from 'ez-utils';

@Injectable()
export class ValidateGetZtrackingPaymentIntentDtoPipe implements PipeTransform {
  transform(value: GetZtrackingPaymentIntentDto, metadata: ArgumentMetadata) {
    if (!value.paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    return value;
  }
}

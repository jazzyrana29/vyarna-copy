import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CapturePaymentIntentDto } from 'ez-utils';

@Injectable()
export class ValidateCapturePaymentIntentDtoPipe implements PipeTransform {
  transform(value: CapturePaymentIntentDto, metadata: ArgumentMetadata) {
    if (!value.paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    return value;
  }
}

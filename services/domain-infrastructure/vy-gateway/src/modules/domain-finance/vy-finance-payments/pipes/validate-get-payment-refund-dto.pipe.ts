import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetPaymentRefundDto } from 'ez-utils';

@Injectable()
export class ValidateGetPaymentRefundDtoPipe implements PipeTransform {
  transform(value: GetPaymentRefundDto, metadata: ArgumentMetadata) {
    if (!value.refundId) {
      throw new BadRequestException('refundId is required');
    }
    return value;
  }
}

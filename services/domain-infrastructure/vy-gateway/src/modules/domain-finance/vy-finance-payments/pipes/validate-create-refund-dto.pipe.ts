import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateRefundDto } from 'ez-utils';

@Injectable()
export class ValidateCreateRefundDtoPipe implements PipeTransform {
  transform(value: CreateRefundDto, metadata: ArgumentMetadata) {
    const { paymentIntentId, amountCents } = value as any;
    if (!paymentIntentId || !amountCents) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

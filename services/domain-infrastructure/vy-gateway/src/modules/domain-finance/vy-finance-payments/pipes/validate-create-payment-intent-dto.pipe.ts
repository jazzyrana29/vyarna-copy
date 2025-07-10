import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePaymentIntentPayloadDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePaymentIntentDtoPipe implements PipeTransform {
  transform(value: CreatePaymentIntentPayloadDto, metadata: ArgumentMetadata) {
    const { items, customerDetails } = value as any;
    if (!Array.isArray(items) || items.length === 0 || !customerDetails) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

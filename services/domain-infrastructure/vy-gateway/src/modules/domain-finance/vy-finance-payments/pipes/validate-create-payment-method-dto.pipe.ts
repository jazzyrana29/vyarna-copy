import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePaymentMethodDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePaymentMethodDtoPipe implements PipeTransform {
  transform(value: CreatePaymentMethodDto, metadata: ArgumentMetadata) {
    const { externalId, type } = value as any;
    if (!externalId || !type) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

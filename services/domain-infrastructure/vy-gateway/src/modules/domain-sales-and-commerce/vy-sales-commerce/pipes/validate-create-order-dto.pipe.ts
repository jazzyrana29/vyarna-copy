import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateOrderDto } from 'ez-utils';

@Injectable()
export class ValidateCreateOrderDtoPipe implements PipeTransform {
  transform(value: CreateOrderDto, _metadata: ArgumentMetadata) {
    const { personId, totalCents, status, currency } = value as any;
    if (!personId || !totalCents || !status || !currency) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateInternalChargeDto } from 'ez-utils';

@Injectable()
export class ValidateCreateInternalChargeDtoPipe implements PipeTransform {
  transform(value: CreateInternalChargeDto, metadata: ArgumentMetadata) {
    const { accountId, amountCents, description } = value as any;
    if (!accountId || !amountCents || !description) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

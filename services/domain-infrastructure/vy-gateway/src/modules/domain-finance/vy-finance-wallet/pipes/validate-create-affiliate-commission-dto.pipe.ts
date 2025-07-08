import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateAffiliateCommissionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateAffiliateCommissionDtoPipe implements PipeTransform {
  transform(value: CreateAffiliateCommissionDto, metadata: ArgumentMetadata) {
    const { partnerId, accountId, orderId, amountCents } = value as any;
    if (!partnerId || !accountId || !orderId || !amountCents) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSubscriptionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateSubscriptionDtoPipe implements PipeTransform {
  transform(value: CreateSubscriptionDto, _metadata: ArgumentMetadata) {
    const { personId, planId } = value as any;
    if (!personId || !planId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

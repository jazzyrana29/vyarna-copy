import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { IssueConsumerRewardDto } from 'ez-utils';

@Injectable()
export class ValidateIssueConsumerRewardDtoPipe implements PipeTransform {
  transform(value: IssueConsumerRewardDto, metadata: ArgumentMetadata) {
    const { consumerId, accountId, sourceType, sourceId, amountCents } = value as any;
    if (!consumerId || !accountId || !sourceType || !sourceId || !amountCents) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}

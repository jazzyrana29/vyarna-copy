import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RetryPaymentAttemptDto } from 'ez-utils';

@Injectable()
export class ValidateRetryPaymentAttemptDtoPipe implements PipeTransform {
  transform(value: RetryPaymentAttemptDto, metadata: ArgumentMetadata) {
    if (!value.attemptId) {
      throw new BadRequestException('attemptId is required');
    }
    return value;
  }
}

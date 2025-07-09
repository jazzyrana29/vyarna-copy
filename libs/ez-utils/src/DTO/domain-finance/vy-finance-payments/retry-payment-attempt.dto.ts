import { PickType } from '@nestjs/swagger';
import { PaymentAttemptDto } from './payment-attempt.dto';

export class RetryPaymentAttemptDto extends PickType(PaymentAttemptDto, ['attemptId'] as const) {}

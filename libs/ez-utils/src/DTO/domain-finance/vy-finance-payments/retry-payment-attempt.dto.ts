import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RetryPaymentAttemptDto {
  @ApiProperty({ description: 'Attempt identifier' })
  @IsUUID()
  attemptId: string;
}

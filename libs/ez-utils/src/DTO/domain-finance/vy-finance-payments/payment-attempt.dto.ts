import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsObject, IsDate } from 'class-validator';

export class PaymentAttemptDto {
  @ApiProperty({ description: 'Attempt identifier' })
  @IsUUID()
  attemptId: string;

  @ApiProperty({ description: 'Associated payment intent id' })
  @IsUUID()
  paymentIntentId: string;

  @ApiProperty({ description: 'Sequential attempt number' })
  @IsInt()
  attemptNumber: number;

  @ApiProperty({ description: 'Status of the attempt', enum: ['PENDING','SUCCESS','FAILED'] })
  @IsString()
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @ApiProperty({ description: 'Error code', required: false })
  @IsOptional()
  @IsString()
  errorCode?: string;

  @ApiProperty({ description: 'Error message', required: false })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiProperty({ description: 'Gateway response', required: false })
  @IsOptional()
  @IsObject()
  gatewayResponse?: Record<string, unknown>;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

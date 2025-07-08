import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsOptional, IsDate } from 'class-validator';

export class ProviderPayoutDto {
  @ApiProperty({ description: 'Provider payout identifier' })
  @IsUUID()
  payoutId: string;

  @ApiProperty({ description: 'Provider identifier' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ description: 'Wallet account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Period start', type: String, format: 'date' })
  @IsString()
  periodStart: string;

  @ApiProperty({ description: 'Period end', type: String, format: 'date' })
  @IsString()
  periodEnd: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Payout status', enum: ['SCHEDULED','PROCESSING','PAID','FAILED'] })
  @IsString()
  status: 'SCHEDULED' | 'PROCESSING' | 'PAID' | 'FAILED';

  @ApiProperty({ description: 'Scheduled time', required: false })
  @IsOptional()
  @IsDate()
  scheduledAt?: Date;

  @ApiProperty({ description: 'Paid time', required: false })
  @IsOptional()
  @IsDate()
  paidAt?: Date;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

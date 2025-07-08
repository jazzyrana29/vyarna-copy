import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsDate } from 'class-validator';

export class AffiliateCommissionDto {
  @ApiProperty({ description: 'Commission identifier' })
  @IsUUID()
  commissionId: string;

  @ApiProperty({ description: 'Partner identifier' })
  @IsUUID()
  partnerId: string;

  @ApiProperty({ description: 'Wallet account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Order identifier' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Commission status', enum: ['PENDING','PAID','FAILED'] })
  @IsString()
  status: 'PENDING' | 'PAID' | 'FAILED';

  @ApiProperty({ description: 'Commission earned time', required: false })
  @IsOptional()
  @IsDate()
  earnedAt?: Date;

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

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsOptional, IsDate } from 'class-validator';

export class ConsumerRewardDto {
  @ApiProperty({ description: 'Consumer reward identifier' })
  @IsUUID()
  rewardId: string;

  @ApiProperty({ description: 'Consumer identifier' })
  @IsUUID()
  consumerId: string;

  @ApiProperty({ description: 'Wallet account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Source type', enum: ['ORDER','REFERRAL','PROMOTION'] })
  @IsString()
  sourceType: 'ORDER' | 'REFERRAL' | 'PROMOTION';

  @ApiProperty({ description: 'Source identifier' })
  @IsUUID()
  sourceId: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Reward status', enum: ['ISSUED','REDEEMED','EXPIRED'] })
  @IsString()
  status: 'ISSUED' | 'REDEEMED' | 'EXPIRED';

  @ApiProperty({ description: 'Issued time', required: false })
  @IsOptional()
  @IsDate()
  issuedAt?: Date;

  @ApiProperty({ description: 'Redeemed time', required: false })
  @IsOptional()
  @IsDate()
  redeemedAt?: Date;

  @ApiProperty({ description: 'Expiration time', required: false })
  @IsOptional()
  @IsDate()
  expiredAt?: Date;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

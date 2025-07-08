import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsDate } from 'class-validator';

export class InternalChargeDto {
  @ApiProperty({ description: 'Charge identifier' })
  @IsUUID()
  chargeId: string;

  @ApiProperty({ description: 'Wallet account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Charge description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Time of charge', required: false })
  @IsOptional()
  @IsDate()
  chargeTime?: Date;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

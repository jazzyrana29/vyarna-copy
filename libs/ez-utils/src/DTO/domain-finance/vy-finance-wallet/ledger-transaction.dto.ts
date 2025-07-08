import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsDate } from 'class-validator';

export class LedgerTransactionDto {
  @ApiProperty({ description: 'Ledger transaction identifier' })
  @IsUUID()
  transactionId: string;

  @ApiProperty({ description: 'Wallet account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Type of transaction', enum: ['PAYOUT','REWARD','COMMISSION','REFUND','ADJUSTMENT'] })
  @IsString()
  transactionType: 'PAYOUT' | 'REWARD' | 'COMMISSION' | 'REFUND' | 'ADJUSTMENT';

  @ApiProperty({ description: 'Related entity type', required: false })
  @IsOptional()
  @IsString()
  relatedType?: string;

  @ApiProperty({ description: 'Related entity identifier', required: false })
  @IsOptional()
  @IsUUID()
  relatedId?: string;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Transaction status', enum: ['PENDING','COMPLETED','FAILED'] })
  @IsString()
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

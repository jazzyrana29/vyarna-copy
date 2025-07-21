import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsDate, IsString, IsOptional } from 'class-validator';

export class ZtrackingWalletAccountDto {
  @ApiProperty({ description: 'Version identifier' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Account identifier', required: false })
  @IsOptional()
  @IsUUID()
  accountId?: string;

  @ApiProperty({ description: 'Person identifier', required: false })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ description: 'Balance in cents', required: false })
  @IsOptional()
  @IsInt()
  balanceCents?: number;

  @ApiProperty({ description: 'Account type', enum: ['PROVIDER','CONSUMER','AFFILIATE','INTERNAL'], required: false })
  @IsOptional()
  @IsString()
  type?: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';

  @ApiProperty({ description: 'Currency code', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Version date', required: false })
  @IsOptional()
  @IsDate()
  versionDate?: Date;
}

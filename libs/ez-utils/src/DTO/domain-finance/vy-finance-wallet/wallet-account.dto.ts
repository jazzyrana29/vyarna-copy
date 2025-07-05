import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate } from 'class-validator';

export class WalletAccountDto {
  @ApiProperty({ description: 'Account identifier' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'Person identifier' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Account type', enum: ['PROVIDER','CONSUMER','AFFILIATE','INTERNAL'] })
  @IsString()
  type: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';

  @ApiProperty({ description: 'Currency code' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Balance in cents' })
  @IsInt()
  balanceCents: number;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsDate()
  updatedAt?: Date;
}

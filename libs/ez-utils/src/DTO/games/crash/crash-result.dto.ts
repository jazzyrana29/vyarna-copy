import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CrashResultDto {
  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty()
  @IsNumber()
  crashPoint: number;

  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;
}

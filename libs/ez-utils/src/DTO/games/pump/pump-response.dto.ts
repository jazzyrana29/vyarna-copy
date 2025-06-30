import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export class PumpResponseDto {
  @ApiProperty()
  @IsBoolean()
  burst: boolean;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsInt()
  pumpsDone: number;
}

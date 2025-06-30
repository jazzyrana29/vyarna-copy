import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class LimboGameConfigDto {
  @ApiProperty()
  @IsNumber()
  maxPayout: number;

  @ApiProperty()
  @IsNumber()
  houseEdge: number;

  @ApiProperty()
  @IsNumber()
  minMultiplier: number;

  @ApiProperty()
  @IsNumber()
  defaultTarget: number;

  @ApiProperty()
  @IsBoolean()
  autoCashout: boolean;

  @ApiProperty()
  @IsBoolean()
  reverseMode: boolean;

  @ApiProperty()
  @IsBoolean()
  turboMode: boolean;

  @ApiProperty()
  @IsString()
  theme: string;
}

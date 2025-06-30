import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LevelDto {
  @ApiProperty()
  @IsString()
  difficulty: string;

  @ApiProperty()
  tiles: number;

  @ApiProperty()
  eggs: number;
}

export class DragonTowerGameConfigDto {
  @ApiProperty({ type: [LevelDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LevelDto)
  levels: LevelDto[];

  @ApiProperty()
  @IsObject()
  multiplierTable: Record<string, number[]>;

  @ApiProperty()
  @IsBoolean()
  autoPick: boolean;

  @ApiProperty()
  @IsBoolean()
  cashoutEnabled: boolean;

  @ApiProperty()
  @IsObject()
  variants: Record<string, boolean>;

  @ApiProperty()
  @IsString()
  theme: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { DragonTowerGameConfigDto } from "./game-config.dto";

export class DragonTowerStartGameResponseDto {
  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty({ type: Object })
  @IsObject()
  gridSize: { rows: number; columns: number };

  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  difficulty: string;

  @ApiProperty({ type: () => DragonTowerGameConfigDto })
  @ValidateNested()
  @Type(() => DragonTowerGameConfigDto)
  config: DragonTowerGameConfigDto;
}

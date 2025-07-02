import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { StartDartsGameDto } from "./start-darts-game.dto";

export class StartDartsBatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StartDartsGameDto)
  games: StartDartsGameDto[];
}

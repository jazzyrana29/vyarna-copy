import { PickType } from "@nestjs/swagger";
import { SnakesRoundDto } from "./snakes-round.dto";

export class CreateSnakesRoundDto extends PickType(SnakesRoundDto, [
  "playerId",
  "betAmount",
  "volatility",
  "clientSeed",
] as const) {}

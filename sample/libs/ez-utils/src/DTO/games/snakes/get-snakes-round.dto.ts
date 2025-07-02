import { PickType } from "@nestjs/swagger";
import { SnakesRoundDto } from "./snakes-round.dto";

export class GetSnakesRoundDto extends PickType(SnakesRoundDto, [
  "roundId",
] as const) {}

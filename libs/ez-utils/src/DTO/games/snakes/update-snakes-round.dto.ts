import { PartialType, PickType, ApiProperty } from "@nestjs/swagger";
import { SnakesRoundDto } from "./snakes-round.dto";
import { IsUUID } from "class-validator";

export class UpdateSnakesRoundDto extends PartialType(
  PickType(SnakesRoundDto, [
    "currentMultiplier",
    "boardState",
    "isFinished",
    "nonce",
  ] as const),
) {
  @ApiProperty({ description: "Identifier of the round", type: String, format: "uuid" })
  @IsUUID()
  roundId: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, IsUUID } from "class-validator";

export class DropPlinkoDto {
  @ApiProperty({ description: "Unique identifier of the game session" })
  @IsUUID()
  gameId: string;

  @ApiProperty({ description: "Index of the drop", minimum: 0 })
  @IsInt()
  @Min(0)
  dropIndex: number;
}

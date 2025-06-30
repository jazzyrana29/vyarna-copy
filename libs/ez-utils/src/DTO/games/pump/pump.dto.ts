import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID, Min } from "class-validator";

export class PumpDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  tileIndex: number;
}

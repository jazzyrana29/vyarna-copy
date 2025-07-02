import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PlinkoProvablyFairRequestDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}

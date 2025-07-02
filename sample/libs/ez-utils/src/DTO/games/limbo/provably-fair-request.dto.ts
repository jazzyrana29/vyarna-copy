import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class LimboProvablyFairRequestDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class LimboCashoutDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}

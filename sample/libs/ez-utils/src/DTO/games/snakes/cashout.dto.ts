import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class SnakesCashoutDto {
  @ApiProperty()
  @IsUUID()
  roundId: string;
}

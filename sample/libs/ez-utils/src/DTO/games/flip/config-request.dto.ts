import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FlipConfigRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  gameId?: string;
}

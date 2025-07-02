import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class StartDiceGameResponseDto {
  @ApiProperty()
  @IsUUID()
  sessionId: string;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;
}

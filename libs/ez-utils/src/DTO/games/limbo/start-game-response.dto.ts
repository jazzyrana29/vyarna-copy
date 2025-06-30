import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class LimboStartGameResponseDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsNumber()
  outcome: number;

  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsNumber()
  nonce: number;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;
}

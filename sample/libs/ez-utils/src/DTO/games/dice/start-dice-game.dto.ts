import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class StartDiceGameDto {
  @ApiProperty({ description: "Wager amount for the game" })
  @IsNumber()
  wager: number;

  @ApiProperty({
    description: "Client seed for provably fair",
    required: false,
  })
  @IsOptional()
  @IsString()
  clientSeed?: string;
}

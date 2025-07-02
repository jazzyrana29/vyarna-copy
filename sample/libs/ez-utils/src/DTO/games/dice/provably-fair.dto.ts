import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class DiceProvablyFairDto {
  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  serverSeed: string;

  @ApiProperty()
  @IsString()
  clientSeed: string;

  @ApiProperty()
  @IsNumber()
  nonce: number;
}

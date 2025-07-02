import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class LimboProvablyFairDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

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

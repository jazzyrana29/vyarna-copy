import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class BlackjackProvablyFairDto {
  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  serverSeed: string;

  @ApiProperty()
  @IsString()
  clientSeed: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  nonceMap: number[];
}

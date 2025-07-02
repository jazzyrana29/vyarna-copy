import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class ProvablyFairPumpDto {
  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  serverSeed: string;

  @ApiProperty()
  @IsString()
  clientSeed: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  nonceMap: string[];
}

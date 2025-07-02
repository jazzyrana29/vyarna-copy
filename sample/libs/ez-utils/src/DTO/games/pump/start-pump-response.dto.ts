import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class StartPumpConfigDto {
  @ApiProperty()
  @IsInt()
  maxPumps: number;
}

export class StartPumpResponseDto {
  @ApiProperty()
  @IsString()
  roundId: string;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  riskLevel: string;

  @ApiProperty({ type: () => StartPumpConfigDto })
  config: StartPumpConfigDto;
}

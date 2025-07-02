import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { WaveTypeDto } from "./wave-type.dto";
import { IsUUID } from "class-validator";

export class GetOneWaveTypeDto extends PartialType(
  PickType(WaveTypeDto, ["name"]),
) {
  @ApiProperty({
    description: "The unique identifier of the wave type",
    type: String,
    format: "uuid",
    example: "849e4566-e11b-12d3-a456-426614174000",
  })
  @IsUUID()
  waveTypeId: string;
}

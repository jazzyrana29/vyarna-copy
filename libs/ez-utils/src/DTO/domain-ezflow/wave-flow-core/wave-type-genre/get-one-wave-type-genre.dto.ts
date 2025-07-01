import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { WaveTypeGenreDto } from "./wave-type-genre.dto";
import { IsUUID } from "class-validator";

export class GetOneWaveTypeGenreDto extends PartialType(
  PickType(WaveTypeGenreDto, ["name"]),
) {
  @ApiProperty({
    description: "Unique identifier of the wave type genre",
    example: "789e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  waveTypeGenreId: string;
}

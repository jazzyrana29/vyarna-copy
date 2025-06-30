import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { WaveDto } from "../wave/wave.dto";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto";
import { FlowDto } from "../flow/flow.dto";
import { WaveTypeGenreDto } from "../wave-type-genre/wave-type-genre.dto";

export class WaveTypeDto {
  @ApiProperty({
    description: "The unique identifier of the wave type",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  waveTypeId: string;

  @ApiProperty({
    description: "The name of the wave type",
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "A brief description of the wave type",
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "The UUID of the genre for this wave type",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  waveTypeGenreId: string;

  @ApiProperty({
    description: "List of waves associated with the wave type",
    type: [WaveDto],
  })
  waves: WaveDto[];

  @ApiProperty({
    description: "The genre of the wave type",
    type: () => WaveTypeGenreDto,
  })
  waveTypeGenre: WaveTypeGenreDto;

  @ApiProperty({
    description: "List of flows associated with the wave type",
    type: [FlowDto],
  })
  flows: FlowDto[];

  @ApiProperty({
    description:
      "Associations between wave type and active flow for business units",
    type: [FlowIsActiveForWaveTypeAndBusinessUnitDto],
  })
  flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnitDto[];

  @ApiProperty({
    description: "JSON schema defining the expected input for this wave type",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  inputSchema?: string;

  @ApiProperty({
    description: "JSON schema defining the expected output for this wave type",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  outputSchema?: string;

  @ApiProperty({
    description: "Indicates if the wave type is marked as deleted",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "The user who last updated this wave type",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the wave type was created",
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the wave type was last updated",
    type: Date,
  })
  @IsDate()
  updatedAt: Date;
}

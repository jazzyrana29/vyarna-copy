import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { WaveTypeDto } from "../wave-type/wave-type.dto";

export class WaveTypeGenreDto {
  @ApiProperty({
    description: "Unique identifier of the wave type genre",
    example: "789e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  waveTypeGenreId: string;

  @ApiProperty({
    description: "Name of the wave type genre",
    example: "Genre 1",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the wave type genre",
    example: "This genre categorizes wave types",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "List of wave types associated with this wave type genre",
    type: [WaveTypeDto],
  })
  @IsArray()
  waveTypes: WaveTypeDto[];

  @ApiProperty({
    description: "Indicates whether the wave type genre is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the wave type genre",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the wave type genre was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the wave type genre was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsArray, IsString } from "class-validator";

export class DropPlinkoResponseDto {
  @ApiProperty()
  @IsInt()
  slot: number;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  path: string[];

  @ApiProperty()
  @IsString()
  proof: string;
}

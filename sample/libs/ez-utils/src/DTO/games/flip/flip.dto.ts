import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { FlipChoice } from "./start-flip.dto";

export class FlipDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty({ enum: FlipChoice })
  @IsEnum(FlipChoice)
  choice: FlipChoice;
}

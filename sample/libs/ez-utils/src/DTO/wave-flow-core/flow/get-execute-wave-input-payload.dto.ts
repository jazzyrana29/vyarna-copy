import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetExecuteWaveInputPayloadDto {
  @ApiProperty({
    description: "The unique identifier of the flow",
    format: "uuid",
    example: "32805c9f-9dec-4f0b-8e07-9bd3b2d9a22c",
  })
  @IsUUID()
  flowId: string;
}

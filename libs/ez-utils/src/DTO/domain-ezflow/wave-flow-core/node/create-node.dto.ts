import { ApiProperty, PickType } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";
import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateNodeDto extends PickType(NodeDto, [
  "flowId",
  "nodeTypeId",
  "name",
  "positionX",
  "positionY",
  "updatedBy",
]) {
  @ApiProperty({
    description: 'Type of the action (e.g. "SendEmail", "SendSMS", etc.)',
    type: String,
    required: false,
    example: "SendEmail",
  })
  @IsString()
  @IsOptional()
  actionType?: string;

  @ApiProperty({
    description:
      "Payload for the action, JSON object with actionVariables keys/values",
    type: Object,
    required: false,
    example: {
      description: "Greeting e-mail to user",
      email: "{{userEmail}}",
      body: "Hello, this is a message.",
      subject: "Greetings",
    },
  })
  @IsObject()
  @IsOptional()
  actionPayload?: Record<string, any>;
}

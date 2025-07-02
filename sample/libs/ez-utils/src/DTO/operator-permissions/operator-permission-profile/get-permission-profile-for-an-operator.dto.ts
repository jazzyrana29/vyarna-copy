import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetPermissionProfileForAnOperatorDto {
  @ApiProperty({
    description: "Unique identifier for the operator",
    required: true,
  })
  @IsUUID()
  operatorId: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class GetListOfPermissionProfileDto {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  isDeleted: boolean;
}

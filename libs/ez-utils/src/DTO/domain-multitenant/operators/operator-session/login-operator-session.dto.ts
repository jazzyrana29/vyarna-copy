import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginOperatorSessionDto {
  @ApiProperty({
    description: "Username for the operator",
    required: true,
    example: "operator_username",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Password for the operator",
    required: true,
    example: "operator_password",
  })
  @IsString()
  password: string;
}

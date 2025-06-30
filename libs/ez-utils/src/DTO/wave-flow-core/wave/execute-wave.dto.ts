import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";

export class InputVariableDto {
  @ApiProperty({
    description: "Variable name",
    example: "threshold",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Variable value",
    example: 10,
  })
  @IsNotEmpty()
  value: any;
}

export class ExecuteWaveDto {
  @ApiProperty({
    description: "Identifier of the wave type to execute",
    example: "2a3b4c5d-678e-90fa-bcde-1234567890ab",
  })
  @IsUUID()
  @IsNotEmpty()
  waveTypeId: string;

  @ApiProperty({
    description: "Identifier of the business unit",
    example: "3f4e5d6c-789a-01bc-def2-34567890abcd",
  })
  @IsUUID()
  @IsNotEmpty()
  businessUnitId: string;

  @ApiProperty({
    description: "Array of input variables",
    isArray: true,
    type: () => InputVariableDto,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InputVariableDto)
  inputVariables?: InputVariableDto[];
}

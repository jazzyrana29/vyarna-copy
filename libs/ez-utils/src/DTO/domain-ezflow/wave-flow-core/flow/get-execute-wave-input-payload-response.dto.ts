import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
  IsIn,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { ExecuteWaveDto } from "../wave/execute-wave.dto";

/**
 * Describes one available output coming from a prior action.
 */
export class AvailableOutputDto {
  @ApiProperty({
    description: "ID of the action producing these outputs",
    example: "10758f3c-a98a-4454-ac5c-57f4beaff2f5",
  })
  @IsUUID()
  actionId: string;

  @ApiProperty({
    description: "Type of the action producing these outputs",
    example: "UpdateUserData",
  })
  @IsNotEmpty()
  actionType: string;

  @ApiProperty({
    description: "Optional human-readable name of the action",
    example: "Save Export URL",
    required: false,
  })
  @IsOptional()
  actionName?: string;

  @ApiProperty({
    description: "List of output property names this action produces",
    example: ["updatedUserData"],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  outputNames: string[];
}

/**
 * Provides context for each input variable: which prior-action
 * outputs could populate it.
 */
export class VariableContextDto {
  @ApiProperty({
    description:
      "ID of the variable (evaluationVariableId or actionVariableId)",
    example: "7e782599-469c-4313-a478-2f060756fda3",
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "Kind of variable this is",
    example: "actionVariable",
    enum: ["evaluationVariable", "actionVariable"],
  })
  @IsIn(["evaluationVariable", "actionVariable"])
  type: "evaluationVariable" | "actionVariable";

  @ApiProperty({
    description: "Logical name of the variable",
    example: "updatedUserData",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      "For each direct predecessor action, the outputs available to fill this variable",
    type: () => AvailableOutputDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailableOutputDto)
  availableOutputs: AvailableOutputDto[];
}

/**
 * Combined payload: the standard ExecuteWaveDto plus rich per-variable context.
 */
export class GetExecuteWaveInputPayloadResponseDto {
  @ApiProperty({
    description: "The core execution payload",
    type: () => ExecuteWaveDto,
  })
  @ValidateNested()
  @Type(() => ExecuteWaveDto)
  executeWave: ExecuteWaveDto;

  @ApiProperty({
    description:
      "Metadata for each variable explaining which prior-action outputs it can consume",
    type: () => VariableContextDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariableContextDto)
  variableContexts: VariableContextDto[];
}

import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsUUID, IsDateString } from "class-validator";
import { Type } from "class-transformer";
import { DeviceSessionDto } from "../device-session/device-session.dto";
import { OperatorDto } from "../operator/operator.dto";
import { DeviceSessionIdDto } from "../../shared-dtos/operators/device-session-id.dto";
import { OperatorIdDto } from "../../shared-dtos/operators/operator-id.dto";

export class OperatorSessionDto {
  @ApiProperty({
    description: "Unique identifier for the operator session",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorSessionId: string;

  @ApiProperty({
    description: "The device session associated with this operator session",
    type: () => DeviceSessionIdDto,
    required: true,
  })
  @Type(() => DeviceSessionIdDto)
  deviceSession: Pick<DeviceSessionDto, "deviceSessionId">;

  @ApiProperty({
    description: "The operator associated with this session",
    type: () => OperatorIdDto,
    required: true,
  })
  @Type(() => OperatorIdDto)
  operator: Pick<OperatorDto, "operatorId">;

  @ApiProperty({
    description: "The user who last updated this session",
    type: String,
    required: false,
  })
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "The creation time of the operator session",
    type: Date,
    required: true,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The last update time of the operator session",
    type: Date,
    required: true,
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: "The login time of the operator",
    type: Date,
    required: true,
  })
  @IsDateString()
  loginTime: Date;

  @ApiProperty({
    description: "The logout time of the operator, if applicable",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  logoutTime: Date | null;
}

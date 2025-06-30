import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { BusinessUnitIdDto } from "../../shared-dtos/operators/business-unit-id.dto";

export class BusinessUnitDto {
  @ApiProperty({
    description: "Unique identifier for the business unit",
    required: false,
    example: "bu-1234",
  })
  @IsUUID()
  @IsOptional()
  businessUnitId: string;

  @ApiProperty({
    description: "Name of the business unit",
    maxLength: 50,
    required: false,
    example: "Sales Division",
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Identifier for the parent business unit",
    nullable: true,
    type: String,
    required: false,
    example: "",
  })
  @IsOptional()
  @IsUUID()
  parentBusinessUnitId?: string;

  @ApiProperty({
    description: "List of child business units",
    required: false,
    isArray: true,
    type: () => BusinessUnitIdDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => BusinessUnitIdDto)
  children?: Pick<BusinessUnitDto, "businessUnitId">[];

  @ApiProperty({
    description: "Indicates if the business unit is deleted",
    default: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the business unit",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the business unit was created",
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the business unit was last updated",
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

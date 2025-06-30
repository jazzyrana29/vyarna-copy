import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { BusinessUnitDto } from "./business-unit.dto";

export class GetBusinessUnitDto extends PartialType(
  PickType(BusinessUnitDto, ["name", "isDeleted"] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the business unit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  businessUnitId: string;
}

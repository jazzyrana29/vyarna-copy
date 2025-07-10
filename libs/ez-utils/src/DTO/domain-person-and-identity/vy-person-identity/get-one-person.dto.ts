import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PersonDto } from "./person.dto";

export class GetOnePersonDto extends PartialType(
  PickType(PersonDto, ["personId", "nameFirst", "isDeleted"] as const),
) {
  @ApiProperty({
    description: "The unique identifier for the operator",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorId: string;
}

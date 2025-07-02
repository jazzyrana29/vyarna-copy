import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PersonDto } from "./person.dto";

export class GetPersonDto extends PartialType(
  PickType(PersonDto, ["nameFirst", "isDeleted"] as const),
) {
  @ApiProperty({
    description: "The unique identifier for the operator",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorId: string;
}

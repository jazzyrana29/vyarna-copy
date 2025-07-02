import { ApiProperty } from "@nestjs/swagger";

export class ActionTypeDto {
  @ApiProperty({
    description: "Discriminator value for the action type",
    example: "AddNote",
  })
  actionType: string;

  @ApiProperty({
    description: "Editable columns for the action type",
    example: [{ propertyName: "name", type: "varchar" }],
  })
  inputColumn: { propertyName: string; type: any }[];
}

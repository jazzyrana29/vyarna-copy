import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TagsEnum } from "../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum";

export class CreateActiveCampaignContactDto {
  @ApiProperty({
    description: "First Name of the contact",
    example: "Joe",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Last Name of the contact",
    example: "Goldberg",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Email of the contact",
    example: "joe-golberg@gmail.com",
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "form id of the contact",
    enum: TagsEnum,
    example: TagsEnum.SIGNUP_HOME_TOP,
  })
  @IsEnum(TagsEnum)
  @IsOptional()
  formId?: TagsEnum;
}

import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsOptional } from "class-validator";
import { PersonDto } from "./person.dto";
import { TagsEnum } from "../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum";

export class CreatePersonDto extends PickType(PersonDto, [
  "rootBusinessUnitId",
  "username",
  "nameFirst",
  "nameMiddle",
  "nameLastFirst",
  "nameLastSecond",
  "password",
  "roles",
  "updatedBy",
] as const) {
  @ApiProperty({ description: "Primary email address" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Identifier for the person agree to associate with vyarna",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  addInActiveCampaign?: boolean;

  @ApiProperty({
    description: "form id of the contact for active campaign",
    enum: TagsEnum,
    example: TagsEnum.SIGNUP_HOME_TOP,
  })
  @IsEnum(TagsEnum)
  @IsOptional()
  formId?: TagsEnum;
}

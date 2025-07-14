import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ActiveCampaignCreateContactDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;
}

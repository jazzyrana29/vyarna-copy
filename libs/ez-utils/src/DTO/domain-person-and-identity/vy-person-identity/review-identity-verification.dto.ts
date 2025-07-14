import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID } from "class-validator";
import { VerificationStatus } from "../../../enums/domain-person-and-identity/verification-status.enum";

export class ReviewIdentityVerificationDto {
  @ApiProperty()
  @IsUUID()
  verificationId: string;

  @ApiProperty({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  status: VerificationStatus;
}

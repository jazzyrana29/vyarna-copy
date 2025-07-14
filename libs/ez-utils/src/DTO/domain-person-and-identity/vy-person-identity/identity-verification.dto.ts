import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { DocumentDto } from "./document.dto";
import { VerificationStatus } from "../../../enums/domain-person-and-identity/verification-status.enum";

export class IdentityVerificationDto {
  @ApiProperty({
    description: "Unique identifier for the verification record",
    type: String,
    required: true,
  })
  @IsUUID()
  verificationId: string;

  @ApiProperty({
    description: "Identifier of the person being verified",
    type: String,
    required: true,
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Current status of the verification",
    enum: VerificationStatus,
    required: true,
  })
  @IsEnum(VerificationStatus)
  status: VerificationStatus;

  @ApiProperty({
    description: "Timestamp when the verification was submitted",
    type: Date,
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  submittedAt: Date;

  @ApiProperty({
    description: "Timestamp when the verification was reviewed",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  reviewedAt?: Date;

  @ApiProperty({
    description: "List of documents associated with this verification",
    type: [DocumentDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents?: DocumentDto[];
}

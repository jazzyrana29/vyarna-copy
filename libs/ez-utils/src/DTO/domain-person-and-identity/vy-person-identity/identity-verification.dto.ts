import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsEnum, IsOptional } from 'class-validator';
import { DocumentDto } from './document.dto';

export enum VerificationStatusDto {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class IdentityVerificationDto {
  @ApiProperty({ description: 'Unique identifier for the verification' })
  @IsUUID()
  verificationId: string;

  @ApiProperty({ description: 'Person related to the verification' })
  @IsUUID()
  personId: string;

  @ApiProperty({ enum: VerificationStatusDto })
  @IsEnum(VerificationStatusDto)
  status: VerificationStatusDto;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  submittedAt: Date;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  reviewedAt?: Date;

  @ApiProperty({ type: () => [DocumentDto], required: false })
  @IsOptional()
  documents?: DocumentDto[];
}

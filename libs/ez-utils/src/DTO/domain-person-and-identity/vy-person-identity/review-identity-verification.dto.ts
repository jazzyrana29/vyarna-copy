import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';
import { VerificationStatusDto } from './identity-verification.dto';

export class ReviewIdentityVerificationDto {
  @ApiProperty()
  @IsUUID()
  verificationId: string;

  @ApiProperty({ enum: VerificationStatusDto })
  @IsEnum(VerificationStatusDto)
  status: VerificationStatusDto;
}
